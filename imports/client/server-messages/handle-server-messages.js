import { getState, setReactState, getReactState } from '/imports/client/global-data/manage-state.js';
import { addOtherPlayerToRoom, setMainPlayer, removeOtherPlayer, updatePlayersCardMapUI } from '/imports/client/pixi/players/add-player-to-room.js';
import { updateOtherPlayerFinalWantedPosition, updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
import { transitionFromMovingToDecidingPhase, transitionFromDecidingToResultPhase, transitionFromResultToMovingPhase} from '/imports/client/pixi/screen/transitions.js';
import { Vector2 } from "/imports/helpers/vector2.js";
import { updateBattleController } from '/imports/client/pixi/controllers/battle-controller.js'

import { getGlobalVariables } from '/imports/shared/global-variables.js';
//state:

serverMessagesHandlers = {
    "joined_game": (message) => {
        console.log("before", getState());
        if (getReactState().gameJoined == false && message.playerJoinedId == Meteor.userId()){
            console.log("joined_game");
            setReactState({
                loggedIn: true,
                gameJoined: true
            });
            for (playerKey in message.players){
                if( playerKey == Meteor.userId()){
                    setMainPlayer(message.players[playerKey]);
                } else {
                    addOtherPlayerToRoom(message.players[playerKey]);
                }
            }
        }



        console.log("ACTUAL MOVING PHASE START");

        getState().isMovingPhase = true;

        console.log(getReactState());
        console.log("after", getState());
    },
    "add_player": (message) => {
        if (getReactState().gameJoined && message.player.id != Meteor.userId()){
            console.log("add_player");
            addOtherPlayerToRoom(message.player);
        }
        console.log("after", getState());
    },
    "removed_player": (message) => {
        if (getReactState().gameJoined == false)
            return ;

        removeOtherPlayer(message.removedPlayerId);
    },
    "change_player_direction": (message) => {
        if (getReactState().gameJoined == false)
            return ;

        console.log("change_player_direction");
        
        if(message.player.id == getState().player.id){
            updateMainPlayerFinalWantedPosition(message.player.finalWantedPosition);
        } else {
            updateOtherPlayerFinalWantedPosition(message.player.id, message.player.finalWantedPosition);
        }
        console.log(getState().player);
        console.log(getState().allPlayers);
    },
    "moving_phase_ended": (message) => {
        if (getReactState().gameJoined == false)
            return ;

        console.log("ACTUAL DECIDING PHASE START");

        getState().isMovingPhase = false;
        console.log("player position", getState().player.position);
        
        transitionFromMovingToDecidingPhase();

        getState().isBattlePhase = true;
        getState().isDecidingPhase = true;
        getState().isSelectActionPhase = true;

        for (playerKey in message.players){
            if (playerKey == Meteor.userId()){
                getState().player.position.x = message.players[playerKey].position.x;
                getState().player.position.y = message.players[playerKey].position.y;
                getState().player.finalWantedPosition = null;
            } else {
                getState().otherPlayers[playerKey].position.x = message.players[playerKey].position.x;
                getState().otherPlayers[playerKey].position.y = message.players[playerKey].position.y;
                getState().otherPlayers[playerKey].finalWantedPosition = null;
            }
        }

        console.log("player position", getState().player.position);
        Meteor.setTimeout(() => {
            console.log("buffer stop deciding phase");
            getState().isSelectTargetPhase = false;
            getState().isSelectDashPositionPhase = false;
            getState().isSelectActionPhase = false;
            
            getState().isDecidingPhase = false;
            transitionFromDecidingToResultPhase();

        }, getGlobalVariables().decidingPhaseTime - getGlobalVariables().decidingPhaseBufferTime)

    },
    "deciding_phase_ended": (message) => {
        if (getReactState().gameJoined == false)
            return ;

        //show result
        console.log("ACTUAL RESULT PHASE START");

        getState().isResultPhase = true;
        for (playerKey in message.players){
            playerDoBattleEffect(message, message.players[playerKey]);
        }



        Meteor.setTimeout(() => {
            console.log("buffer stop result phase");
            getState().isResultPhase = false;
            getState().isBattlePhase = false;
            transitionFromResultToMovingPhase();

            // for (playerKey in message.players){
            //     if (playerKey == Meteor.userId()){
            //         getState().player.position.x = message.players[playerKey].lastPosition.x;
            //         getState().player.position.y = message.players[playerKey].lastPosition.y;
            //         getState().player.finalWantedPosition = null;
            //     } else {
            //         getState().otherPlayers[playerKey].position.x = message.players[playerKey].lastPosition.x;
            //         getState().otherPlayers[playerKey].position.y = message.players[playerKey].lastPosition.y;
            //         getState().otherPlayers[playerKey].finalWantedPosition = null;
            //     }
            // }
            
            console.log("player position", getState().player.position);
            
            for (playerKey in message.players){
                playerSetFinalState(message.players[playerKey]);
            }
            updateBattleController(getState().player);

            Meteor.setTimeout(() => {

                console.log("ACTUAL MOVING PHASE START");
                getState().isMovingPhase = true;

            }, getGlobalVariables().resultPhaseBufferTime);
        }, getGlobalVariables().resultPhaseTime - getGlobalVariables().resultPhaseBufferTime);
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    if (serverMessagesHandlers[serverMessage.functionId] != null)
        serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
import { getState, setReactState, getReactState } from '/imports/client/global-data/manage-state.js';
import { addOtherPlayerToRoom, setMainPlayer, removeOtherPlayer } from '/imports/client/pixi/players/add-player-to-room.js';
import { updateOtherPlayerFinalWantedPosition, updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
import { transitionFromMovingToDecidingPhase, transitionFromDecidingToResultPhase, transitionFromResultToMovingPhase} from '/imports/client/pixi/screen/transitions.js';
import { Vector2 } from "/imports/helpers/vector2.js";

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

        Meteor.setTimeout(() => {
            console.log("JOINED_GAME buffer stop moving phase");
            getState().isMovingPhase = false;
            transitionFromMovingToDecidingPhase();

        }, message.timeUntilMovingPhaseEnds - getGlobalVariables().movingPhaseBufferTime)
        

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

        getState().isBattlePhase = true;
        getState().isDecidingPhase = true;

        Meteor.setTimeout(() => {
            console.log("buffer stop deciding phase");
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

        Meteor.setTimeout(() => {
            console.log("buffer stop result phase");
            getState().isResultPhase = false;
            getState().isBattlePhase = false;
            transitionFromResultToMovingPhase();
            Meteor.setTimeout(() => {

                console.log("ACTUAL MOVING PHASE START");
                getState().isMovingPhase = true;

                Meteor.setTimeout(() => {
                    console.log("buffer stop moving phase");
                    getState().isMovingPhase = false;
                    transitionFromMovingToDecidingPhase();

                }, getGlobalVariables().movingPhaseTime - getGlobalVariables().movingPhaseBufferTime)


            }, getGlobalVariables().resultPhaseBufferTime);
        }, getGlobalVariables().resultPhaseTime - getGlobalVariables().resultPhaseBufferTime);
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    if (serverMessagesHandlers[serverMessage.functionId] != null)
        serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
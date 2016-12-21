import { getState, setReactState, getReactState } from '/imports/client/global-data/manage-state.js';
import { addOtherPlayerToRoom, setMainPlayer } from '/imports/client/pixi/players/add-player-to-room.js';
import { updateOtherPlayerFinalWantedPosition, updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
import { Vector2 } from "/imports/helpers/vector2.js";
//state:

serverMessagesHandlers = {
    "joined_game": (message) => {
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

        console.log(getReactState());
        console.log(getState());
    },
    "add_player": (message) => {
        if(getReactState().gameJoined && message.player.id != Meteor.userId()){
            console.log("add_player");
            addOtherPlayerToRoom(message.player);
        }
        console.log(getState());
    },
    "removed_player": (message) => {
        console.log("game state before", getState());
        // remove from allPlayers array
        var index = null;
        for (i in getState().allPlayers){
            if(getState().allPlayers[i].id == message.removedPlayerId){
                index = i;
                break;
            }
        }
        getState().allPlayers.splice(index,1);
        // remove from otherPlayers object
        delete getState().otherPlayers[message.removedPlayerId];
        console.log("game state after", getState());
    },
    "change_player_direction": (message) => {
        console.log("change_player_direction");
        
        if(message.player.id == getState().player.id){
            updateMainPlayerFinalWantedPosition(message.player.finalWantedPosition);
        } else {
            updateOtherPlayerFinalWantedPosition(message.player.id, message.player.finalWantedPosition);
        }
        console.log(getState().player);
        console.log(getState().allPlayers);
    },
    "moving_phase_started": (message) => {
        getState().isMovingPhase = true;
        console.log(getState());
    },
    "moving_phase_ended": (message) => {
        getState().isMovingPhase = false;
        console.log(getState());
    },
    "battle_phase_started": (message) => {
        getState().isBattlePhase = true;
        console.log(getState());
    },
    "battle_phase_ended": (message) => {
        getState().isBattlePhase = false;
        console.log(getState());
    },
    "deciding_phase_started": (message) => {
        getState().isDecidingPhase = true;
        console.log(getState());
    },
    "deciding_phase_ended": (message) => {
        getState().isDecidingPhase = false;
        console.log(getState());
    },
    "result_phase_started": (message) => {
        getState().isResultPhase = true;
        console.log(getState());
    },
    "result_phase_ended": (message) => {
        getState().isResultPhase = false;
        console.log(getState());
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
import { getState, setReactState, getReactState } from '/imports/client/global-data/manage-state.js';
import { addOtherPlayerToRoom, setMainPlayer, removeOtherPlayer } from '/imports/client/pixi/players/add-player-to-room.js';
import { updateOtherPlayerFinalWantedPosition, updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
import { Vector2 } from "/imports/helpers/vector2.js";
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
        getState().isMovingPhase = true;

        console.log(getReactState());
        console.log("after", getState());
    },
    "add_player": (message) => {
        console.log("before", getState());
        if(getReactState().gameJoined && message.player.id != Meteor.userId()){
            console.log("add_player");
            addOtherPlayerToRoom(message.player);
        }
        console.log("after", getState());
    },
    "removed_player": (message) => {
        removeOtherPlayer(message.removedPlayerId);
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
    "moving_phase_ended": (message) => {
        console.log("before", getState());
        getState().isMovingPhase = false;
        for (playerId in message.players){
            if(getReactState().gameJoined && message.players[playerId].id == Meteor.userId()){
                getState().player.moveSpeed = message.players[playerId].moveSpeed;
                getState().player.position = new Vector2(message.players[playerId].position.x, message.players[playerId].position.y);
                getState().player.finalWantedPosition = message.players[playerId].finalWantedPosition;
            } else {
                getState().otherPlayers[playerId] = message.players[playerId];
                getState().otherPlayers[playerId].moveSpeed = message.players[playerId].moveSpeed;
                getState().otherPlayers[playerId].position = new Vector2(message.players[playerId].position.x, message.players[playerId].position.y);
                getState().otherPlayers[playerId].finalWantedPosition = message.players[playerId].finalWantedPosition;
            }
        }
        console.log("after", getState());
    },
    "deciding_phase_ended": (message) => {
        console.log("before", getState());
        getState().isMovingPhase = true;
        getState().isDecidingPhase = false;
        if(getReactState().gameJoined){
            for (playerId in message.players){
                if(message.players[playerId].id == Meteor.userId()){
                    getState().player.canPlayShield = message.players[playerId].canPlayShield;
                    getState().player.currentCards = message.players[playerId].currentCards;
                    getState().player.currentHp = message.players[playerId].currentHp;
                    getState().player.maxHp = message.players[playerId].maxHp;
                    getState().player.moveSpeed = message.players[playerId].moveSpeed;
                    getState().player.position = new Vector2(message.players[playerId].lastPosition.x, message.players[playerId].lastPosition.y);
                } else {
                    getState().otherPlayers[playerId].canPlayShield = message.players[playerId].canPlayShield;
                    getState().otherPlayers[playerId].currentCards = message.players[playerId].currentCards;
                    getState().otherPlayers[playerId].currentHp = message.players[playerId].currentHp;
                    getState().otherPlayers[playerId].maxHp = message.players[playerId].maxHp;
                    getState().otherPlayers[playerId].moveSpeed = message.players[playerId].moveSpeed;
                    getState().otherPlayers[playerId].position = new Vector2(message.players[playerId].lastPosition.x, message.players[playerId].lastPosition.y);
                }
            }    
        }
        

        console.log("after", getState());
        
        
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    if (serverMessagesHandlers[serverMessage.functionId] != null)
        serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
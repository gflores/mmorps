import { getState, setReactState, getReactState } from '/imports/client/global-data/manage-state.js';
import { addOtherPlayerToRoom } from '/imports/client/pixi/players/add-player-to-room.js';
import { updateOtherPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
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
                    getState().player = message.players[playerKey]
                } else {
                    getState().otherPlayers[playerKey] = message.players[playerKey];
                }
                getState().allPlayers.push(message.players[playerKey]);
            }
        }

        console.log(getReactState());
        console.log(getState());
    },
    "add_player": (message) => {
        if(getReactState().gameJoined && message.player.id != Meteor.userId()){
            console.log("add_player");
            getState().otherPlayers[message.player.id] = message.player;
            getState().allPlayers.push(message.player);
        }
        console.log(getState());
    },
    "change_player_direction": (message) => {
        console.log("change_player_direction");
        
        if(message.player.id == getState().player.id){
            getState().player.finalWantedPosition = message.player.finalWantedPosition;
            getState().player.moveSpeed = message.player.moveSpeed;
            getState().player.position = message.player.position;
            getState().player.lastUpdatedTime = message.player.lastUpdatedTime;
        } else {
            getState().otherPlayers[message.player.id].finalWantedPosition = message.player.finalWantedPosition;
            getState().otherPlayers[message.player.id].moveSpeed = message.player.moveSpeed;
            getState().otherPlayers[message.player.id].position = message.player.position;
            getState().otherPlayers[message.player.id].lastUpdatedTime = message.player.lastUpdatedTime;
        }
        console.log(getState().player);
        console.log(getState().allPlayers);
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
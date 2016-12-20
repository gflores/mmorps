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
    "change_player_direction": (message) => {
        console.log("change_player_direction");
        
        if(message.player.id == getState().player.id){
            updateMainPlayerFinalWantedPosition(message.player.finalWantedPosition);
        } else {
            updateOtherPlayerFinalWantedPosition(message.player.id, message.player.finalWantedPosition);
        }
        console.log(getState().player);
        console.log(getState().allPlayers);
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructJoinedGameMessage, constructAddPlayerMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';

import { updateAllPlayerPosition } from '/imports/server/gameplay/position/compute-position.js';

export const addPlayerToRoom = (gameData, userId) => {
    if (duplicateKey(gameData.player_keys, userId) == false) {
        var newPlayer = createNewPlayer();
        gameData.players[userId] = newPlayer;
        gameData.player_keys.push(userId);
        
        sendMainServerMessage(constructAddPlayerMessage(Meteor.userId(), gameData.player_keys, gameData.players[userId]));
        sendMainServerMessage(constructJoinedGameMessage(Meteor.userId(), gameData));
        console.log(gameData);
    } else {
        console.log(userId, " cannot join room");
    }
};

const duplicateKey = (playerKeys, userId) => {
    for( index in playerKeys){
        if(playerKeys[index] == userId){
            return true;
        }
    }
    return false;
};
import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructJoinedGameMessage, constructAddPlayerMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';

import { LaunchAsync } from '/imports/helpers/async.js';
import { Wait } from '/imports/helpers/wait.js';

import { getGlobalVariables } from '/imports/shared/global-variables.js';

import { updateAllPlayerPosition } from '/imports/server/gameplay/position/compute-position.js';

export const addPlayerToRoom = (gameData, userId) => {
    if (duplicateKey(gameData.player_keys, userId) == false) {
        LaunchAsync(()=> {
            var newPlayer = createNewPlayer(userId);
            gameData.players[userId] = newPlayer;
            gameData.player_keys.push(userId);
            
            var timeTillNextMovingPhase = gameData.nextMovingPhaseTime.getTime() - (new Date()).getTime();
            console.log("time till next moving phase", timeTillNextMovingPhase);

            if(timeTillNextMovingPhase > (getGlobalVariables().decidingPhaseTime + getGlobalVariables().resultPhaseTime) ){
                sendMainServerMessage(constructAddPlayerMessage(userId, gameData.player_keys, gameData.players[userId]));
                sendMainServerMessage(constructJoinedGameMessage(userId, gameData, getGlobalVariables().movingPhaseTime));
            } else {
                Wait(timeTillNextMovingPhase);
                sendMainServerMessage(constructAddPlayerMessage(userId, gameData.player_keys, gameData.players[userId]));
                sendMainServerMessage(constructJoinedGameMessage(userId, gameData, timeTillNextMovingPhase - getGlobalVariables().decidingPhaseTime - getGlobalVariables().resultPhaseTime));
            }
            
            console.log(gameData);
        });

        
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
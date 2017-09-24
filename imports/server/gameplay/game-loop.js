import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResult } from '/imports/server/gameplay/compute-round-result';
import { initializeRoom } from '/imports/server/manage-game-room/setup-room.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructNewRoundMessage } from '/imports/server/server-messages/server-message-format.js';

import { newRoundDelay, endRoundDelay } from '/imports/shared/global-variables.js';

isGameEnded = (gameData) => {
    for (var playerId in gameData.players){
       if (gameData.players[playerId].currentHp <= 0) {
           return true;
       }
    }
    return false;
}

export const gameLoop = (gameData) => {

    while(isGameEnded(gameData) == false) {
        console.log("new round");

        gameData.currentRoundStartTime = new Date();
        // sending server message
        sendMainServerMessage(constructNewRoundMessage(newRoundDelay));

        gameData.canDuelAction = true;

        console.log("player 1 hand", gameData.player_keys[0] ,gameData.players[gameData.player_keys[0]].currentCards);
        console.log("player 2 hand", gameData.player_keys[1], gameData.players[gameData.player_keys[1]].currentCards);
        LaunchAsync(()=> {
            console.log("awaiting players input");
            Wait(900);
            console.log("7");
            Wait(1000);
            console.log("6");
            Wait(1000);
            console.log("5");
            Wait(1000);
            console.log("4");
            Wait(1000);
            console.log("3");
            Wait(1000);
            console.log("2");
            Wait(1000);
            console.log("1");
        });
        Wait(newRoundDelay);
        // waiting for user to type in their input

        console.log("computing result");
        gameData.canDuelAction = false;
        computeRoundResult(gameData);
        
        Wait(endRoundDelay);
        console.log("finished animation");
        console.log("result: ", gameData);
    }
    
    console.log("game has ended");
    
    initializeRoom(gameData);
}
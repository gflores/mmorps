import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResult } from '/imports/server/gameplay/compute-round-result';
import { gameEnd } from '/imports/server/manage-game-room/game-end.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getDuelStartedMessage, getEndGameMessage } from '/imports/server/server-messages/server-message-format.js';

export const mainGameLoop = (gameData) => {


    while(!gameEnd(gameData)) {
        console.log("new round");
        // sending server message
        sendMainServerMessage(getNewRoundMessage(gameData));

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
        Wait(8000);
        // waiting for user to type in their input
        console.log("computing result");

        computeRoundResult(gameData);
        
        Wait(3000);
        console.log("finished animation");
        console.log("result: ", gameData);
    }
    
    // sending server message
    sendMainServerMessage(getEndGameMessage(gameData));
    
    console.log("game has ended");
}
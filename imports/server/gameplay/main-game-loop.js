import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResult } from '/imports/server/gameplay/compute-round-result';
import { gameEnd } from '/imports/server/manage-game-room/game-end.js';
import { getPlayerKeys } from '/imports/server/manage-game-room/player-keys.js';

export const mainGameLoop = (gameData) => {

    var playerKeys = getPlayerKeys();
    
    while(!gameEnd(gameData, playerKeys)) {
        console.log("new round");
        
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

        computeRoundResult(gameData, playerKeys);
        
        Wait(3000);
        console.log("finished animation");
        console.log("result: ", gameData);
    }
    
    console.log("game has ended");
}
import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResult } from '/imports/server/gameplay/compute-round-result';

export const mainGameLoop = (gameData) => {
    LaunchAsync(()=>{
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
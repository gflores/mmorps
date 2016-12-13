import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResult } from '/imports/server/gameplay/compute-round-result';
import { gameEnd } from '/imports/server/manage-game-room/game-end.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructNewRoundMessage } from '/imports/server/server-messages/server-message-format.js';

import { getGlobalVariables, getNewRoundDelay, getEndRoundDelay } from '/imports/shared/global-variables.js';
import { enableMainGameDuel, disableMainGameDuel, resetMainGameData } from '/imports/server/global-data/global-data.js';

positionPhase = function(){
    Wait(getGlobalVariables().movingPhaseTime);
}

decidingPhase = function(){
    console.log("new round");
    // sending server message
    // sendMainServerMessage(constructNewRoundMessage(getNewRoundDelay()));

    // enableMainGameDuel();

    // console.log("player ", gameData.player_keys[0] ,gameData.players[gameData.player_keys[0]].currentCards);
    // console.log("player 2 hand", gameData.player_keys[1], gameData.players[gameData.player_keys[1]].currentCards);
    // LaunchAsync(()=> {
    //     console.log("awaiting players input");
    //     Wait(900);
    //     console.log("7");
    //     Wait(1000);
    //     console.log("6");
    //     Wait(1000);
    //     console.log("5");
    //     Wait(1000);
    //     console.log("4");
    //     Wait(1000);
    //     console.log("3");
    //     Wait(1000);
    //     console.log("2");
    //     Wait(1000);
    //     console.log("1");
    // });
    // Wait(getNewRoundDelay());    
}

resultPhase = function(){
    // console.log("computing result");
    // disableMainGameDuel();
    // computeRoundResult(gameData);
    
    // Wait(getEndRoundDelay());
    // console.log("finished animation");
    // console.log("result: ", gameData);
}

actionPhase = function(){
    // waiting for user to type in their input
    decidingPhase();
    resultPhase();
}

export const mainGameLoop = (gameData) => {

    

    while(!gameEnd(gameData)) {
        positionPhase();
        // actionPhase();
    }
    
    console.log("game has ended");
    
    resetMainGameData();
}
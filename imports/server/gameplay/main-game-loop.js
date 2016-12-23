import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResult } from '/imports/server/gameplay/compute-round-result';
import { gameEnd } from '/imports/server/manage-game-room/game-end.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructNewRoundMessage, constructPlayerPositionMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';
import * as phases from '/imports/server/server-messages/server-messages-format/phases.js';

import { getGlobalVariables } from '/imports/shared/global-variables.js';
import { getMainGameData, enableMainGameDuel, disableMainGameDuel, resetMainGameData } from '/imports/server/global-data/global-data.js';

import { getGameEndDebugVar, setGameEndDebugVarTrue, setGameEndDebugVarFalse } from '/imports/server/global-data/debug-variables.js';

import { updateCurrentPosition } from '/imports/server/gameplay/position/compute-position.js';

movingPhase = function(){
    console.log("*** moving phase ***");
    sendMainServerMessage(phases.constructMovingPhaseStartedMessage(getMainGameData().player_keys));

    getMainGameData().canMove = true;

    Wait(getGlobalVariables().movingPhaseTime);

    getMainGameData().canMove = false;
    
    sendMainServerMessage(phases.constructMovingPhaseEndedMessage(getMainGameData().player_keys, getMainGameData().players));

    // update all player's current positions
    console.log("updating current players now that moving phase ended");
    for (key in getMainGameData().players){
        console.log("before: ", getMainGameData().players[key]);
        updateCurrentPosition(getMainGameData().players[key]);
        console.log("after: ", getMainGameData().players[key]);
    }
}

decidingPhase = function(){
    console.log("deciding phase");
    sendMainServerMessage(phases.constructDecidingPhaseStartedMessage(getMainGameData().player_keys));
    Wait(getGlobalVariables().decidingPhaseTime);
    
    sendMainServerMessage(phases.constructDecidingPhaseEndedMessage(getMainGameData().player_keys));
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
    console.log("result phase");
    sendMainServerMessage(phases.constructResultPhaseStartedMessage(getMainGameData().player_keys));
    Wait(getGlobalVariables().resultPhaseTime);
    
    sendMainServerMessage(phases.constructResultPhaseEndedMessage(getMainGameData().player_keys));
    // console.log("computing result");
    // disableMainGameDuel();
    // computeRoundResult(gameData);
    
    // Wait(getEndRoundDelay());
    // console.log("finished animation");
    // console.log("result: ", gameData);
}

battlePhase = function(){
    console.log("*** action phase ***");
    sendMainServerMessage(phases.constructBattlePhaseStartedMessage(getMainGameData().player_keys));
    // waiting for user to type in their input
    decidingPhase();
    
    Wait(getGlobalVariables().decidingToResultPhaseTransitionTime);
    
    resultPhase();
    
    sendMainServerMessage(phases.constructBattlePhaseEndedMessage(getMainGameData().player_keys));
}

export const mainGameLoop = (gameData) => {
    
    while (!getGameEndDebugVar()){
        console.log('in game');
        
        movingPhase();
        
        Wait(getGlobalVariables().movingToActionPhaseTransitionTime);
        
        battlePhase();
        
        Wait(getGlobalVariables().actionToMovingPhaseTransitionTime);
    }
    
    // while(!gameEnd(gameData)) {
    //     positionPhase();
    //     // actionPhase();
    // }
    
    console.log("game has ended");
    
    // resetMainGameData();
}
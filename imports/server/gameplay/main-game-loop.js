import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { computeRoundResults } from '/imports/server/gameplay/compute-round-results/compute-round-result.js';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructNewRoundMessage, constructPlayerPositionMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';
import * as phases from '/imports/server/server-messages/server-messages-format/phases.js';

import { getGlobalVariables } from '/imports/shared/global-variables.js';
import { getMainGameData, updateNextMovingPhaseTime } from '/imports/server/global-data/global-data.js';

import { getGameEndDebugVar } from '/imports/server/global-data/debug-variables.js';

import { updateCurrentPosition, clearFinalPosition } from '/imports/server/gameplay/position/compute-position.js';

import { updateAllPlayerDashedPosition } from '/imports/server/gameplay/position/dash.js';

movingPhase = function(){
    console.log("*** moving phase ***");
    
    clearFinalPosition(getMainGameData().players);
    
    updateNextMovingPhaseTime(new Date());

    getMainGameData().canMove = true;

    Wait(getGlobalVariables().movingPhaseTime);

    getMainGameData().canMove = false;
    
    sendMainServerMessage(phases.constructMovingPhaseEndedMessage(getMainGameData().player_keys, getMainGameData().players));

    // update all player's current positions
    console.log("updating current players now that moving phase ended");
    for (key in getMainGameData().players){
        updateCurrentPosition(getMainGameData().players[key]);
    }
}

decidingPhase = function(){
    console.log("deciding phase");
    getMainGameData().canDuelAction = true;
    Wait(getGlobalVariables().decidingPhaseTime);
    
    getMainGameData().canDuelAction = false;
    sendMainServerMessage(phases.constructDecidingPhaseEndedMessage(getMainGameData().player_keys, getMainGameData().players));

}

resultPhase = function(){
    console.log("result phase");
    Wait(getGlobalVariables().resultPhaseTime);

}

battlePhase = function(){
    console.log("*** action phase ***");
    // waiting for user to type in their input
    decidingPhase();
    
    updateAllPlayerDashedPosition(getMainGameData().players);
    
    computeRoundResults(getMainGameData());
    Wait(getGlobalVariables().decidingToResultPhaseTransitionTime);
    
    resultPhase();
    
}

export const mainGameLoop = (gameData) => {
    
    while (!getGameEndDebugVar()){
        console.log('in game');
        
        movingPhase();

        battlePhase();
    }

    
    console.log("game has ended");
    
    // resetMainGameData();
}
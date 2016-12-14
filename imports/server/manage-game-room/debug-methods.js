import { setGameEndDebugVarFalse, setGameEndDebugVarTrue } from '/imports/server/global-data/debug-variables.js';
import { getMainGameData, resetMainGameData, endMainGame } from '/imports/server/global-data/global-data.js';

import { LaunchAsync } from '/imports/helpers/async.js';

import { updateCurrentPosition } from '/imports/server/gameplay/position/compute-position.js';
import { constructPlayerPositionMessage } from '/imports/server/server-messages/server-message-format.js';

Meteor.methods({
    endGameDebugTrue: () => {
        LaunchAsync(()=> {
            console.log('calling game end');
            setGameEndDebugVarTrue();
        });
        
    },
    endGameDebugFalse: () => {
        LaunchAsync(()=> {
            console.log('calling game end to false');
            setGameEndDebugVarFalse();
        });
    },
    getGameDataStatus: () => {
        LaunchAsync(()=> {
            console.log('get game data status');
            console.log(getMainGameData());
        });
    },
    testTimeDifference: () => {
        LaunchAsync(()=> {
            console.log('get time difference');
            playerPositions = getMainGameData().players;
            for(playerId in playerPositions){
                updateCurrentPosition(playerPositions[playerId]);    
            }
            
        });
    }
});
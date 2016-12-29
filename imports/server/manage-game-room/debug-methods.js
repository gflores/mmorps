import { setGameEndDebugVarFalse, setGameEndDebugVarTrue } from '/imports/server/global-data/debug-variables.js';
import { getMainGameData, resetMainGameData, endMainGame } from '/imports/server/global-data/global-data.js';

import { LaunchAsync } from '/imports/helpers/async.js';

import { updateCurrentPosition } from '/imports/server/gameplay/position/compute-position.js';
import { constructPlayerPositionMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';

import { dash } from '/imports/server/gameplay/position/dash.js';
import { target } from '/imports/server/gameplay/duels/target.js';
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
    dash: (x, y) => {
        var userId = Meteor.userId();
        LaunchAsync(()=> {
            console.log("dash player information", getMainGameData().players[userId]);
            dash(getMainGameData().players[userId], x, y);
        });
    },
    // playCard: (cardIndex, x, y, target) => {
    //    
    // }
    // target: (targetPlayerId) -> {
    //     LaunchAsync(()=>{
    //         target(getMainGameData().players[Meteor.userId()], targetPlayerId);
    //     })
    // }
});
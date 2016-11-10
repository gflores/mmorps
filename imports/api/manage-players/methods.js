import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { getGameData, resetGameData } from '/imports/api/game-data/game-data.js';

Meteor.methods({
    JoinGame: () => {
        gameData = getGameData();
        
        gameData[new Date().toString()] = true;
        console.log("current game: ", gameData);
    },

    ResetGame: () => {
        resetGameData();
    },

    TestWait: () => {
        console.log("A: 1");
        Wait(3000);

        console.log("A: 2");
        LaunchAsync(() => {
            console.log("B: 1");
            Wait(1500);

            console.log("B: 2");
            Wait(2000);

            console.log("B: 3");

        });
        Wait(2000);

        console.log("A: 3");
    }
});
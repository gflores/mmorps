import '/imports/server/startup.js';

import { getMainGameData } from '/imports/server/global-data/global-data.js';
import { LaunchAsync } from '/imports/helpers/async.js';
import { launchGame } from '/imports/server/manage-game-room/launch-game.js';
Meteor.startup(()=>{
    if(getMainGameData().gameLaunched == false) {
        getMainGameData().gameLaunched = true;
        LaunchAsync(()=> {
            launchGame(getMainGameData());
        });
    }
});
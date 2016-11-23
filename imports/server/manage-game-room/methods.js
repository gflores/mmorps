import { getMainGameData, resetMainGameData } from '/imports/server/global-data/global-data.js';

import { addPlayerToRoom } from '/imports/server/manage-game-room/add-player-to-room.js';

import { launchGame } from '/imports/server/manage-game-room/launch-game.js';

import { LaunchAsync } from '/imports/helpers/async.js';

import { cleanupMainServerMessages } from '/imports/server/server-messages/main-server-messages.js';

Meteor.methods({
    JoinMainGame: () => {
        addPlayerToRoom(getMainGameData(), Meteor.userId());

        if (getMainGameData().player_keys.length == 2) {
            LaunchAsync(()=> {
                launchGame(getMainGameData());
            });
        }
    },

    ResetMainGame: () => {
        resetMainGameData();
        cleanupMainServerMessages();
    }
    
    
});
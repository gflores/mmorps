import { getMainGameData, resetMainGameData } from '/imports/server/global-data/global-data.js';

import { addPlayerToRoom } from '/imports/server/manage-game-room/add-player-to-room.js';

import { launchGame } from '/imports/server/manage-game-room/launch-game.js';

Meteor.methods({
    JoinMainGame: () => {
        addPlayerToRoom(getMainGameData(), Meteor.userId());
    },

    ResetMainGame: () => {
        resetMainGameData();
    },

    LaunchMainGame: () => {
        launchGame(getMainGameData());
    }
});
import { getGameData, resetGameData } from '/imports/server/game-data/game-data.js';
import { getPlayerKeys, resetPlayerKeys } from '/imports/server/manage-game-room/player-keys.js';

import { addPlayerToRoom } from '/imports/server/manage-game-room/add-player-to-room.js';

import { launchGame } from '/imports/server/manage-game-room/launch-game.js';

Meteor.methods({
    JoinGame: () => {
        addPlayerToRoom(getGameData(), Meteor.userId());
    },

    ResetGame: () => {
        resetGameData();
    },

    ResetKeys: () => {
        resetPlayerKeys();    
    },

    LaunchGame: () => {
        launchGame(getGameData());
    }
});
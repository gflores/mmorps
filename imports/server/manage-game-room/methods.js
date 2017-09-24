import { initializeRoom } from '/imports/server/manage-game-room/setup-room.js';

import { getMainGameData } from '/imports/server/global-data/global-data.js';

import { addPlayerToRoom } from '/imports/server/manage-game-room/add-player-to-room.js';

import { launchGame } from '/imports/server/manage-game-room/launch-game.js';

import { LaunchAsync } from '/imports/helpers/async.js';

import { cleanupMainServerMessages } from '/imports/server/server-messages/main-server-messages.js';

Meteor.methods({
    JoinMainGame: () => {
        var gameData = getMainGameData();
        
        addPlayerToRoom(gameData, Meteor.userId());

        if (gameData.player_keys.length == 2) {
            LaunchAsync(()=> {
                launchGame(gameData);
            });
        }
    },

    ResetMainGame: () => {
        initializeRoom(getMainGameData());
        cleanupMainServerMessages();
    },
    
    EndMainGame: () => {
        var gameData = getMainGameData();

        gameData.players[gameData.player_keys[0]].currentHp = -9999;
    }
    
    
});
import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructJoinedGameMessage } from '/imports/server/server-messages/server-message-format.js';

export const addPlayerToRoom = (gameData, userId) => {
    if (gameData.player_keys[0] != userId) {
        var newPlayer = createNewPlayer();
        gameData.players[userId] = newPlayer;
        gameData.player_keys.push(userId);
        sendMainServerMessage(constructJoinedGameMessage());
        console.log(gameData);
    } else {
        console.log(userId, " cannot join room");
    }
}
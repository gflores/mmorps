import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getJoinedGameMessage } from '/imports/server/server-messages/server-message-format.js';

export const addPlayerToRoom = (gameData, userId) => {
    var newPlayer = createNewPlayer();
    gameData.players[userId] = newPlayer;
    gameData.player_keys.push(userId);

    sendMainServerMessage(getJoinedGameMessage());
    console.log(gameData);
}
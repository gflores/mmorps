import { createNewPlayer } from '/imports/server/gameplay/players/create-new-player';

import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructJoinedGameMessage } from '/imports/server/server-messages/server-message-format.js';

export const addPlayerToRoom = (gameData, userId) => {
    if (_.contains(gameData.player_keys, userId) == true || gameData.player_keys.length == 2)
        console.log(`${userId} is already inside, or room is already full`)
    else {
        var newPlayer = createNewPlayer();
        
        gameData.players[userId] = newPlayer;
        gameData.player_keys.push(userId);
        sendMainServerMessage(constructJoinedGameMessage());
        console.log("current gamedata: ", gameData);
    }
}
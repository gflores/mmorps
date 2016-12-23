import { getMainGameData } from '/imports/server/global-data/global-data.js';

import { constructRemovedPlayerMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';
import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';

export const removePlayerFromRoom = function(playerId){
    var gameData = getMainGameData();
    var players = gameData.players;
    var playerKeys = gameData.player_keys;
    var index = playerKeys.indexOf(playerId);
    playerKeys.splice(index, 1);
    delete players[playerId];

    sendMainServerMessage(constructRemovedPlayerMessage(playerId,playerKeys));
}
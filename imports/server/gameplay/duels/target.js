import { getMainGameData } from '/imports/server/global-data/global-data.js'

export const target = function(player, targetId) {
    player.targetPlayerId = targetId;
};
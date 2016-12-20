import { getMainGameData } from '/imports/server/global-data/global-data.js';

export const removePlayerFromRoom = function(playerId){
    var gameData = getMainGameData();
    console.log("removing player: ", playerId);
}
import { getState } from "/imports/client/global-data/manage-state.js";

state = getState();

export const updatePlayerFinalWantedPosition = function(id, finalWantedPosition){
    var player = state.otherPlayers[id];
    player.finalWantedPosition = finalWantedPosition;
}


window.updatePlayerFinalWantedPosition = updatePlayerFinalWantedPosition;
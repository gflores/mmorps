import { getState } from "/imports/client/global-data/manage-state.js";

state = getState();

export const updateOtherPlayerFinalWantedPosition = function(id, finalWantedPosition){
    var player = state.otherPlayers[id];
    player.finalWantedPosition = new Vector2(finalWantedPosition.x, finalWantedPosition.y);
}

export const updateMainPlayerFinalWantedPosition = function(finalWantedPosition){
    var player = state.player;
    player.finalWantedPosition = new Vector2(finalWantedPosition.x, finalWantedPosition.y);
}


window.updateOtherPlayerFinalWantedPosition = updateOtherPlayerFinalWantedPosition;
window.updateMainPlayerFinalWantedPosition = updateMainPlayerFinalWantedPosition;
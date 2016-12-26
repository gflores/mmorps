import { getGlobalVariables } from '/imports/shared/global-variables.js';
import { Vector2 } from '/imports/helpers/vector2.js';

export const dash = function (player){
    if(player.wantedDashedPosition) {
        var currentPosition = player.lastPosition;
        var distance = player.wantedDashedPosition.distance(currentPosition);
        if (distance <= getGlobalVariables().dashDistance) {
            player.lastPosition = player.wantedDashedPosition.clone();
        } else {
            // move 3 units to dashed position
            var dashVector = player.wantedDashedPosition.subtract(player.lastPosition).normalize().scale(getGlobalVariables().dashDistance);
            player.lastPosition.add(dashVector);
        }
        player.wantedDashedPosition = null;
        console.log("dash updated ", player);
    } else {
        console.log(player.id, "no dash positions available");
    }
};

export const setDashPosition = function (player, x, y){
    player.wantedDashedPosition = new Vector2(x, y);
};

export const updateAllPlayerDashedPosition = function (players) {
    for (index in players){
        dash(players[index]);
    }
};
import { getGlobalVariables } from '/imports/shared/global-variables.js';

export const dash = function (player, dashedPosition){
    var currentPosition = player.lastPosition;
    var distance = dashedPosition.distance(currentPosition);
    if(distance <= getGlobalVariables().dashDistance){
        player.lastPosition = dashedPosition;
    } else {
        // move 3 units to dashed position
        var dashVector = dashedPosition.subtract(player.lastPosition).normalize().scale(getGlobalVariables().dashDistance);
        player.lastPosition.add(dashVector);
    }
};
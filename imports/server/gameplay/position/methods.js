import { updateCurrentPosition, updateFinalPosition } from '/imports/server/gameplay/position/compute-position.js';

import { getMainGameData } from '/imports/server/global-data/global-data.js';
import { Vector2 } from '/imports/helpers/vector2.js';

Meteor.methods({
    moveToCoordinates: function(x, y){
        if(getMainGameData().canMove) {
            console.log("now moving to x: ", x, "y: ", y);
            var player = getMainGameData().players[Meteor.userId()];
            //player

            console.log("---------updating current position-------");

            // update player's position
            updateCurrentPosition(player);

            console.log("---------updating final position---------");
            //modify the player with the new destination and other stuff
            updateFinalPosition(player, getMainGameData().player_keys, new Vector2(x, y));
            // now update player's position again with new destination
        } else {
            console.log("Cannot Move!");
        }
    }
});
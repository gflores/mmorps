import { computePosition } from '/imports/server/gameplay/position/compute-position.js';


Meteor.methods({
    moveToCoordinates: function(x, y){
        console.log("now moving to x: ", x, "y: ", y);
        Meteor.userId();
        //player

        //computePosition(player);
        
        //modify the player with the new destination and other stuff
    }
});
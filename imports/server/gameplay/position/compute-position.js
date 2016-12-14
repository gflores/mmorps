import { Vector2 } from '/imports/helpers/vector2.js';

export const updateCurrentPosition = function(player){
    var now = new Date();
    if(player.finalWantedPosition == null){
        console.log("no final destination set");
        player.lastUpdatedTime = now;
        return;
    }

    timeDifference = (now.getTime() - player.lastUpdatedTime.getTime())/1000;
    positionDifference = player.finalWantedPosition.subtract(player.lastPosition);
    
    console.log("time difference", timeDifference);
    console.log("position difference", positionDifference);

    console.log("calculated past wanted final position", didCalculatedPassFinalPosition(player));
    if(didCalculatedPassFinalPosition(player)){
        player.lastPosition = player.finalWantedPosition;
        player.lastUpdatedTime = now;
        player.currentVelocity = new Vector2(0, 0);
        player.finalWantedPosition = null;

        console.log("player position info", {
            lastPosition: player.lastPosition,
            lastUpdatedTime: player.lastUpdatedTime,
            currentVelocity: player.currentVelocity,
            finalWantedPosition: player.finalWantedPosition
        });
        return;
    } else {
        player.lastPosition = player.lastPosition.add(player.currentVelocity.scale(timeDifference));
        player.lastUpdatedTime = now;

        console.log("player position info", {
            lastPosition: player.lastPosition,
            lastUpdatedTime: player.lastUpdatedTime,
            currentVelocity: player.currentVelocity,
            finalWantedPosition: player.finalWantedPosition
            
        });
        return;
    }
    
    // player.lastPosition;
    // player.lastTimeUpdated;
    // player.currentVelocity;
    // player.finalWantedPosition;    
};

export const updateFinalPosition = function (player, destination) {
    player.finalWantedPosition = destination;
    player.currentVelocity = player.finalWantedPosition.subtract(player.lastPosition).normalize();
    updateCurrentPosition(player);
};

const didCalculatedPassFinalPosition = function( player ){
    var now = new Date();
    timeDifference = (now.getTime() - player.lastUpdatedTime.getTime())/1000;
    calculatedFinalPosition = player.lastPosition.add(player.currentVelocity.scale(timeDifference));

    console.log("calculated final position", calculatedFinalPosition);
    if (calculatedFinalPosition.subtract(player.finalWantedPosition).x * player.currentVelocity.x > 0){
        return true;
    } else {
        return false;
    }
};
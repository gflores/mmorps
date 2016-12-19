import { Vector2 } from '/imports/helpers/vector2.js';
import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { constructChangePlayerDirectionMessage } from '/imports/server/server-messages/server-message-format.js';

export const updateCurrentPosition = function(player){
    var now = new Date();
    if(player.finalWantedPosition == null){
        console.log("no final destination set");
        player.lastUpdatedTime = now;
        return;
    }

    timeDifference = (now.getTime() - player.lastUpdatedTime.getTime())/1000;
    
    console.log("time difference", timeDifference);

    console.log("calculated past wanted final position", didCalculatedPassFinalPosition(player));
    if(didCalculatedPassFinalPosition(player)){
        player.lastPosition = player.finalWantedPosition;
        player.lastUpdatedTime = now;
        player.finalWantedPosition = null;

        console.log("player position info", {
            lastPosition: player.lastPosition,
            lastUpdatedTime: player.lastUpdatedTime,
            moveSpeed: player.moveSpeed,
            finalWantedPosition: player.finalWantedPosition
        });
        return;
    } else {
        currentVelocity = player.finalWantedPosition.subtract(player.lastPosition).normalize();
        player.lastPosition = player.lastPosition.add(currentVelocity.scale(player.moveSpeed).scale(timeDifference));
        player.lastUpdatedTime = now;

        console.log("player position info", {
            lastPosition: player.lastPosition,
            lastUpdatedTime: player.lastUpdatedTime,
            moveSpeed: player.moveSpeed,
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
    updateCurrentPosition(player);
    sendMainServerMessage(constructChangePlayerDirectionMessage(player));
};

const didCalculatedPassFinalPosition = function( player ){
    var now = new Date();
    timeDifference = (now.getTime() - player.lastUpdatedTime.getTime())/1000;
    currentVelocity = player.finalWantedPosition.subtract(player.lastPosition).normalize();
    calculatedFinalPosition = player.lastPosition.add(currentVelocity.scale(player.moveSpeed).scale(timeDifference));

    console.log("calculated final position", calculatedFinalPosition);
    if (calculatedFinalPosition.subtract(player.finalWantedPosition).x * currentVelocity.x > 0){
        return true;
    } else {
        return false;
    }
};
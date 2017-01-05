import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from "/imports/client/pixi/setup-game-ui.js";

import { convertAbsoluteToRelativePlayerPosition, convertToScreenValues } from "/imports/client/pixi/screen/convert-position.js";

updatePlayerHealth = function(player){
    var ratio = player.currentHp / player.maxHp;

    var damageWidth = (player.healthbarSprite.width - 2) * (1 - ratio);

    player.healthbarDamageSprite.width = damageWidth;
    player.healthbarDamageSprite.x = player.healthbarSprite.x + player.healthbarSprite.width - damageWidth - 2;
}

updatePlayerScreenPosition = function(player){

    player.renderContainer.x = player.position.x;
    player.renderContainer.y = player.position.y;


    convertAbsoluteToRelativePlayerPosition(player.renderContainer);
    convertToScreenValues(player.renderContainer);
}

updatePlayerCards = function(player){
    
}

updatePlayer = function(player){
    if (state.isMovingPhase == true && player.finalWantedPosition != null){
        var distanceToFinalWantedPosition = player.position.distance(player.finalWantedPosition);

        if (distanceToFinalWantedPosition == 0)
            return ;

        var moveVector = player.finalWantedPosition.clone().subtract(player.position).normalize().scale(player.moveSpeed);
        moveVector.scale(state.currentDeltaTime);

        var previousPosition = player.position.clone();
        player.position.add(moveVector);

        var distanceTraveled = player.position.distance(previousPosition);
        if (distanceTraveled >= distanceToFinalWantedPosition){
            player.position = player.finalWantedPosition;
            player.finalWantedPosition = null;
        }
    }
    
    updatePlayerScreenPosition(player);
    updatePlayerHealth(player);
    updatePlayerCards(player);
}

export const updatePlayers = function(players){
    for (var i = 0; i != players.length; ++i){
        var player = players[i];
        updatePlayer(player);
    }
}
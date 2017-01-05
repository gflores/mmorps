import { getState } from "/imports/client/global-data/manage-state.js";
import { getTextures } from "/imports/client/pixi/textures.js";

var state = getState();

setMainSprite = function(player, texture){
    player.mainSprite = texture;

    player.renderContainer.addChild(player.mainSprite)

    player.mainSprite.height = 40;
    player.mainSprite.width = 40;

    player.mainSprite.x = -20; // relative to the renderContainer, effectively placing the center correctly
    player.mainSprite.y = -20;    
}

setHealthBar = function(player){
    player.healthbarSprite = new PIXI.Graphics();

    player.renderContainer.addChild(player.healthbarSprite)

    var width = 70;
    var height = 12;

    player.healthbarSprite.lineStyle(2, 0x222222, 1);
    player.healthbarSprite.beginFill(0xFF0000);
    player.healthbarSprite.drawRect(0, 0, width, height);
    player.healthbarSprite.endFill();
    player.healthbarSprite.x = -( (width + 1) / 2);
    player.healthbarSprite.y = -40;


    player.healthbarDamageSprite = new PIXI.Graphics();

    player.renderContainer.addChild(player.healthbarDamageSprite)

    var damageWidth = (width - 2) * 0.2;
    var damageHeight = 10;

    player.healthbarDamageSprite.beginFill(0x222222);
    player.healthbarDamageSprite.drawRect(0, 0, damageWidth, height);
    player.healthbarDamageSprite.endFill();
    player.healthbarDamageSprite.x = player.healthbarSprite.x + width - damageWidth - 1;
    player.healthbarDamageSprite.y = -39;
}

setPlayerCards = function(player){
    player.cardSprites = [ new PIXI.Graphics(), new PIXI.Graphics(),  new PIXI.Graphics()];

    //each card (present or not): circle
    //If present:

    //Paper: green
    //Scissor: Red
    //Rock: Brown
    //Display value in the circle

    //If not present: gray circle

}

export const addOtherPlayerToRoom = function(player){
    state.otherPlayers[player.id] = player;
    state.allPlayers.push(player);

    player.position = new Vector2(player.position.x, player.position.y);
    if (player.finalWantedPosition != null)
        player.finalWantedPosition = new Vector2(player.finalWantedPosition.x, player.finalWantedPosition.y);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    setMainSprite(player, new PIXI.Sprite(getTextures().otherPlayer));
    setHealthBar(player);
}

export const setMainPlayer = function(player){
    console.log("set main player called");
    state.player = player;
    state.allPlayers.push(player);

    player.position = new Vector2(player.position.x, player.position.y);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    setMainSprite(player, new PIXI.Sprite(getTextures().mainPlayer));
    setHealthBar(player);
}

export const removeOtherPlayer = function(playerId){
    var player = getState().otherPlayers[playerId];
    if (player == null){
        console.log("ERROR: no player to remove");
        return ;
    }
    state.gameMap.removeChild(player.renderContainer);

    var index = null;
    for (i in getState().allPlayers){
        if(getState().allPlayers[i].id == playerId){
            index = i;
            break;
        }
    }
    getState().allPlayers.splice(index,1);
    // remove from otherPlayers object
    delete getState().otherPlayers[playerId];
}

window.addOtherPlayerToRoom = addOtherPlayerToRoom;
window.setMainPlayer = setMainPlayer;

import { getState } from "/imports/client/global-data/manage-state.js";

var state = getState();

export const addPlayerToRoom = function(player){
    state.otherPlayers[player.id] = player;
    state.allPlayers.push(player);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    player.renderContainer.x = player.initialPosition.x;
    player.renderContainer.y = player.initialPosition.y;

    player.mainSprite = new PIXI.Graphics()

    player.renderContainer.addChild(player.mainSprite)

    player.mainSprite.lineStyle(4, 0xFF3300, 1);
    player.mainSprite.beginFill(0x66CCFF);
    player.mainSprite.drawRect(0, 0, 64, 64);
    player.mainSprite.endFill();
}
import { getState } from "/imports/client/global-data/manage-state.js";

var state = getState();

export const addOtherPlayerToRoom = function(player){
    state.otherPlayers[player.id] = player;
    state.allPlayers.push(player);

    player.position = new Vector2(player.position.x, player.position.y);
    if (player.finalWantedPosition != null)
        player.finalWantedPosition = new Vector2(player.finalWantedPosition.x, player.finalWantedPosition.y);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    player.mainSprite = new PIXI.Graphics()

    player.renderContainer.addChild(player.mainSprite)

    player.mainSprite.beginFill(0xCC0033);
    player.mainSprite.drawRect(0, 0, 20, 20);

    player.mainSprite.x = -10; // relative to the renderContainer, effectively placing the center correctly
    player.mainSprite.y = -10;

    player.mainSprite.endFill();
}

export const setMainPlayer = function(player){
    state.player = player;
    state.allPlayers.push(player);

    player.position = new Vector2(player.position.x, player.position.y);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    player.mainSprite = new PIXI.Graphics()

    player.renderContainer.addChild(player.mainSprite)

    player.mainSprite.beginFill(0x3300CC);
    player.mainSprite.drawRect(0, 0, 20, 20);

    player.mainSprite.x = -10; // relative to the renderContainer, effectively placing the center correctly
    player.mainSprite.y = -10;

    player.mainSprite.endFill();
}
window.addOtherPlayerToRoom = addOtherPlayerToRoom;

window.setMainPlayer = setMainPlayer;
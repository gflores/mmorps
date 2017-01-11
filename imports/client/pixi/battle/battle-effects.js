import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { constructMoveToCoroutine } from '/imports/client/pixi/screen/position-helper.js';

var state = getState();

export const setupBattleEffects = function(){
    state.attackProjectileContainer = new PIXI.Container();

    state.attackProjectile = new PIXI.Graphics();

    state.attackProjectileContainer.addChild(state.attackProjectile);

    state.gameMap.addChild(state.attackProjectileContainer);


    state.attackProjectile.beginFill(0xFF0000);
    state.attackProjectile.drawCircle(0, 0, 32);
    state.attackProjectile.endFill();
}
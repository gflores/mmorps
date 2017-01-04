import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';

var state = getState();

export const setupBattleController = function(){
    state.battleController = new PIXI.Container();

    state.battleController.y = getScreenParameters().dimensions.height;

    state.screenContainer.addChild(state.battleController);

    state.battleControllerBackground = new PIXI.Graphics();
    state.battleControllerBackground.beginFill(0x0, 1);
    state.battleControllerBackground.drawRect(0, 0, getScreenParameters().battleControllerDimensions.width, getScreenParameters().battleControllerDimensions.height);
    state.battleControllerBackground.endFill();

    state.battleController.addChild(state.battleControllerBackground);
}
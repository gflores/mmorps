import { getState } from '/imports/client/global-data/manage-state.js';
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';

var state = getState();

export const setupFade = function(){
    // state.fadePlane = new PIXI.Graphics();

    // state.fadePlane.beginFill(0x0, 1);
    // state.fadePlane.drawRect(0, 0, getScreenParameters().dimensions.width, getScreenParameters().dimensions.height);
    // state.fadePlane.endFill();
    // state.fadePlane.alpha = 0.5;

    // state.screenContainer.addChild(state.fadePlane);
}

// fadeAnimationFunc = function(){
//     currentTimeFrame
// }
// export const LaunchFade = function(options){

// }
import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';

var state = getState();


export const transitionFromMovingToDecidingPhase = function(){
    state.battleController.y = getScreenParameters().dimensions.height - getScreenParameters().battleControllerDimensions.height;
}

export const transitionFromDecidingToResultPhase = function(){

}

export const transitionFromResultToMovingPhase = function(){
    state.battleController.y = getScreenParameters().dimensions.height;
}

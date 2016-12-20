import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';

var state = getState();

export const convertAbsoluteToRelativePlayerPosition = function(position){
    position.x -= state.player.position.x;
    position.y -= state.player.position.y;
}

export const convertToScreenValues = function(vector){
    vector.x *= getScreenParameters().gameDistanceToPixelsRatio;
    vector.y *= getScreenParameters().gameDistanceToPixelsRatio;

    vector.y = -vector.y;

    vector.x += getScreenParameters().dimensions.width / 2;
    vector.y += getScreenParameters().dimensions.height / 2;
}
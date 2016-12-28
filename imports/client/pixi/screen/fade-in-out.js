import { getState } from '/imports/client/global-data/manage-state.js';
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { addCoroutine } from '/imports/client/pixi/coroutines/coroutine-system.js';

var state = getState();

export const setupFade = function(){
    state.fadePlane = new PIXI.Graphics();

    state.fadePlane.beginFill(0x0, 1);
    state.fadePlane.drawRect(0, 0, getScreenParameters().dimensions.width, getScreenParameters().dimensions.height);
    state.fadePlane.endFill();
    state.fadePlane.alpha = 0;

    state.screenContainer.addChild(state.fadePlane);
}

export const launchFade = function(options){
    if (options.startAlpha != null)
        state.fadePlane.alpha = options.startAlpha;
    var alphaDifference = options.endAlpha - state.fadePlane.alpha;
    var alphaDelta = alphaDifference / options.duration;

    addCoroutine((data) => {
        state.fadePlane.alpha += alphaDelta * state.currentDeltaTime;

        data.currentTime += state.currentDeltaTime;

        if (data.currentTime >= options.duration){
            state.fadePlane.alpha = options.endAlpha;
            return false;
        }

        return true;
    }, {
        currentTime: 0
    });
}

window.launchFade = launchFade;
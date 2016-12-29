import { getState } from '/imports/client/global-data/manage-state.js';
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { addCoroutine, constructCoroutine, chainCoroutines } from '/imports/client/pixi/coroutines/coroutine-system.js';

var state = getState();

export const setupFade = function(){
    state.fadePlane = new PIXI.Graphics();

    state.fadePlane.beginFill(0x0, 1);
    state.fadePlane.drawRect(0, 0, getScreenParameters().dimensions.width, getScreenParameters().dimensions.height);
    state.fadePlane.endFill();
    state.fadePlane.alpha = 0;

    state.screenContainer.addChild(state.fadePlane);
}

export const constructFadeCoroutine = function(options){
    return constructCoroutine(() => {
        if (options.startAlpha != null)
            state.fadePlane.alpha = options.startAlpha;
        var alphaDifference = options.endAlpha - state.fadePlane.alpha;
        var alphaDelta = alphaDifference / options.duration;

        return {
            alphaDelta: alphaDelta
        };
    }, (data, currentTime) => {
        state.fadePlane.alpha += data.alphaDelta * state.currentDeltaTime;

        if (currentTime >= options.duration){
            state.fadePlane.alpha = options.endAlpha;
            return false;
        }

        return true;
    });
}

export const launchFade = function(options){
    var coroutine = constructFadeCoroutine(options);

    addCoroutine(coroutine);
}

export const launchMirrorFade = function(options){
    var coroutine1 = constructFadeCoroutine(options);

    options = Object.assign({}, options);

    var endAlpha = options.endAlpha;
    options.endAlpha = options.startAlpha;
    options.startAlpha = endAlpha;

    var coroutine2 = constructFadeCoroutine(options);

    chainCoroutines(coroutine1, [
        coroutine2
    ]);

    addCoroutine(coroutine1);
}



window.launchFade = launchFade;
window.launchMirrorFade = launchMirrorFade;
import { getState } from '/imports/client/global-data/manage-state.js';

var state = getState();

var activeCoroutines = [];

export const constructCoroutine = function(startupFunc, handler){
    return {
        startupFunc: startupFunc,
        handler: handler,
        data: null,
        currentTime: 0
    }
}

export const chainCoroutines = function(coroutine, nextCoroutines){
    coroutine.nextCoroutines = nextCoroutines;
}

export const addCoroutine = function(coroutine){
    activeCoroutines.push(coroutine);
};

export const computeCoroutines = function(){
    for (var i = 0; activeCoroutines.length != i; ++i){
        var coroutine = activeCoroutines[i];

        coroutine.currentTime += state.currentDeltaTime;
        if (coroutine.startupFunc != null){
            var data = coroutine.startupFunc();
            coroutine.data = data;
            coroutine.startupFunc = null
        }

        if (coroutine.handler(coroutine.data, coroutine.currentTime) == false){
            activeCoroutines.splice(i, 1);
            --i;

            if (coroutine.nextCoroutines != null && coroutine.nextCoroutines.length != 0){
                var nextCoroutine = coroutine.nextCoroutines.shift();
                if (coroutine.nextCoroutines != null && coroutine.nextCoroutines.length != 0)
                    chainCoroutines(nextCoroutine, coroutine.nextCoroutines);
                
                addCoroutine(nextCoroutine);
            }
        }
    }
}

window.addCoroutine = addCoroutine;
window.chainCoroutines = chainCoroutines;
window.constructCoroutine = constructCoroutine;
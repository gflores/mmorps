import { addCoroutine, constructCoroutine, chainCoroutines } from '/imports/client/pixi/coroutines/coroutine-system.js';

export const constructMoveToCoroutine = function(object, fromPosition, toPosition, duration){
    return constructCoroutine(() => {
        if (fromPosition != null){
            object.x = fromPosition.x;
            object.y = fromPosition.y;
        }

        var xDelta = (toPosition.x - object.x) / duration;
        var yDelta = (toPosition.y - object.y) / duration;

        return {
            xDelta: xDelta,
            yDelta: yDelta
        };
    }, (data, currentTime) => {
        object.x += data.xDelta * state.currentDeltaTime;
        object.y += data.yDelta * state.currentDeltaTime;

        if (currentTime >= duration){
            object.x = toPosition.x;
            object.y = toPosition.y;

            return false;
        }

        return true;
    });
}

window.constructMoveToCoroutine = constructMoveToCoroutine;
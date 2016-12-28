var activeCoroutines = [];

export const addCoroutine = function(handler, data){
    activeCoroutines.push({
        handler: handler,
        data: data
    });
};

export const computeCoroutines = function(){
    for (var i = 0; activeCoroutines.length != i; ++i){
        var coroutine = activeCoroutines[i];

        if (coroutine.handler(coroutine.data) == false){
            activeCoroutines.splice(i, 1);
            --i;
        }
    }
}
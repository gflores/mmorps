import { getState } from "/imports/client/global-data/manage-state.js";
import { updatePlayers } from "./players/update-players.js";

var state = getState();

var screenParameters = {
    gameDistanceToPixelsRatio: 10
}

export const getScreenParameters = function (){
    return screenParameters;
}

initializePixiContainer = function(){
    state.renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
    document.getElementById('pixi-game-ui').appendChild(state.renderer.view);
}

export const setupGameUi = function(){
    initializePixiContainer();

    state.gameMap = new PIXI.Container();


    animate();
    function animate(currentTimeFrame) {
        requestAnimationFrame(animate);

        if (state.lastTimeFrame != null){
            state.currentDeltaTime = (currentTimeFrame - state.lastTimeFrame) / 1000;
            updatePlayers(state.allPlayers);
        }
        state.lastTimeFrame = currentTimeFrame;

        state.renderer.render(state.gameMap);
    }
}
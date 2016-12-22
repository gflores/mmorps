import { getState } from "/imports/client/global-data/manage-state.js";
import { updatePlayers } from "./players/update-players.js";
import { displayGrid, setupGrid } from "/imports/client/pixi/screen/display-grid.js";
import { convertScreenPositionToAbsolutePosition } from "/imports/client/pixi/screen/convert-position.js";
import { updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';

var state = getState();

var screenParameters = {
    gameDistanceToPixelsRatio: 10,
    dimensions: {width: 600, height: 600},
    gridLineEveryDistance: 8
}

export const getScreenParameters = function (){
    return screenParameters;
}

initializePixiContainer = function(){
    state.renderer = PIXI.autoDetectRenderer(screenParameters.dimensions.width, screenParameters.dimensions.height,{backgroundColor : 0xEEEEEE});
    document.getElementById('pixi-game-ui').appendChild(state.renderer.view);
}

initializeMap = function(){
    state.gameMap = new PIXI.Container();

    state.mapBackground = new PIXI.Graphics();
    state.mapBackground.beginFill(0x0, 0);
    state.mapBackground.drawRect(0, 0, screenParameters.dimensions.width, screenParameters.dimensions.height);
    state.mapBackground.endFill();

    state.gameMap.addChild(state.mapBackground);

    state.mapBackground.interactive = true
    state.mapBackground.on('mousedown', () => {
        var currentMousePosition = state.renderer.plugins.interaction.mouse.global;
        convertScreenPositionToAbsolutePosition(currentMousePosition);

        // updateMainPlayerFinalWantedPosition(currentMousePosition);
        Meteor.call('moveToCoordinates', currentMousePosition.x, currentMousePosition.y);
    });
}
export const setupGameUi = function(){
    initializePixiContainer();
    initializeMap();

    setupGrid();



    animate();
    function animate(currentTimeFrame) {
        requestAnimationFrame(animate);

        if (state.lastTimeFrame != null){
            state.currentDeltaTime = (currentTimeFrame - state.lastTimeFrame) / 1000;

            displayGrid();
            updatePlayers(state.allPlayers);
        }
        state.lastTimeFrame = currentTimeFrame;

        state.renderer.render(state.gameMap);
    }
}
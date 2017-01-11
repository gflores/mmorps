import { getState } from "/imports/client/global-data/manage-state.js";
import { updatePlayers } from "./players/update-players.js";
import { displayGrid, setupGrid } from "/imports/client/pixi/screen/display-grid.js";
import { convertScreenPositionToAbsolutePosition } from "/imports/client/pixi/screen/convert-position.js";
import { updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
import { setupFade } from '/imports/client/pixi/screen/fade-in-out.js';
import { computeCoroutines, addCoroutine, constructCoroutine } from '/imports/client/pixi/coroutines/coroutine-system.js';
import { setupBattleController } from '/imports/client/pixi/controllers/battle-controller.js';
import { setupBattleEffects } from '/imports/client/pixi/battle/battle-effects.js';

var state = getState();

var screenParameters = {
    gameDistanceToPixelsRatio: 10,
    dimensions: {width: 700, height: 620},
    gameMapDimensions: {width: 700, height: 620},
    battleControllerDimensions: {width: 700, height: 150},

    gridLineEveryDistance: 8
}

export const getScreenParameters = function (){
    return screenParameters;
}

initializePixiContainer = function(){
    state.renderer = PIXI.autoDetectRenderer(screenParameters.dimensions.width, screenParameters.dimensions.height,{backgroundColor : 0xEEEEEE});
    document.getElementById('pixi-game-ui').appendChild(state.renderer.view);

    state.screenContainer = new PIXI.Container();
}

initializeMap = function(){
    state.gameMap = new PIXI.Container();

    state.screenContainer.addChild(state.gameMap);

    state.mapBackground = new PIXI.Graphics();
    state.mapBackground.beginFill(0x0, 0);
    state.mapBackground.drawRect(0, 0, screenParameters.gameMapDimensions.width, screenParameters.gameMapDimensions.height);
    state.mapBackground.endFill();

    state.gameMap.addChild(state.mapBackground);

    state.mapBackground.interactive = true
    state.mapBackground.on('mousedown', () => {
        if (state.isMovingPhase == true){
            var currentMousePosition = state.renderer.plugins.interaction.mouse.global;
            convertScreenPositionToAbsolutePosition(currentMousePosition);

            updateMainPlayerFinalWantedPosition(currentMousePosition);

            Meteor.call('moveToCoordinates', currentMousePosition.x, currentMousePosition.y);
        } else if (state.isDecidingPhase == true){
            var currentMousePosition = state.renderer.plugins.interaction.mouse.global;
            convertScreenPositionToAbsolutePosition(currentMousePosition);
            Meteor.call('Dash', currentMousePosition.x, currentMousePosition.y);
        }
    });
}

animationFunc = function(currentTimeFrame) {
    requestAnimationFrame(animationFunc);

    if (state.lastTimeFrame != null){
        state.currentDeltaTime = (currentTimeFrame - state.lastTimeFrame) / 1000;
    }
    state.lastTimeFrame = currentTimeFrame;

    if (state.currentDeltaTime != null)
        computeCoroutines();

    state.renderer.render(state.screenContainer);
}

export const setupGameUi = function(){
    initializePixiContainer();
    initializeMap();

    setupGrid();
    setupBattleController();
    setupFade();

    setupBattleEffects();

    addCoroutine(constructCoroutine(null, () => {
        displayGrid();
        updatePlayers(state.allPlayers);

        //updateDisplayBattleController

        return true;
    }));

    requestAnimationFrame(animationFunc);
}
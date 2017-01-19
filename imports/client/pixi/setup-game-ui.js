import { getState } from "/imports/client/global-data/manage-state.js";
import { updatePlayers } from "./players/update-players.js";
import { displayGrid, setupGrid } from "/imports/client/pixi/screen/display-grid.js";
import { convertScreenPositionToAbsolutePosition, convertToScreenValues} from "/imports/client/pixi/screen/convert-position.js";
import { updateMainPlayerFinalWantedPosition } from '/imports/client/pixi/players/player-location.js';
import { setupFade } from '/imports/client/pixi/screen/fade-in-out.js';
import { computeCoroutines, addCoroutine, constructCoroutine } from '/imports/client/pixi/coroutines/coroutine-system.js';
import { setupBattleController } from '/imports/client/pixi/controllers/battle-controller.js';
import { setupBattleEffects } from '/imports/client/pixi/battle/battle-effects.js';

import { decidePlayDash } from '/imports/client/gameplay/player-actions.js';
import { getGlobalVariables } from '/imports/shared/global-variables.js';
import { Vector2 } from '/imports/helpers/vector2.js';

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
            console.log("activating dash");
            var currentMousePosition = state.renderer.plugins.interaction.mouse.global;
            convertScreenPositionToAbsolutePosition(currentMousePosition);
            decidePlayDash(currentMousePosition.x, currentMousePosition.y);
            // Meteor.call('Dash', currentMousePosition.x, currentMousePosition.y);
        }
    });

    
    // for target lines
    state.targetLine = new PIXI.Graphics();
    state.dashLine = new PIXI.Graphics();
    state.gameMap.addChild(state.targetLine);
    state.gameMap.addChild(state.dashLine);
    state.mapBackground.on('pointermove', () => {
        // should be isDecidingPhase
        if(state.isSelectDashPositionPhase == true ){

            state.mapBackground.buttonMode = true;
            state.mapBackground.defaultCursor = 'crosshair';

            var currentMousePosition = state.renderer.plugins.interaction.mouse.global;
            var playerPosition = new Vector2(0, 0); // center of screen
            convertToScreenValues(playerPosition);
            renderTargetLine(playerPosition, currentMousePosition);
            renderDashLine(playerPosition, currentMousePosition);

            state.player.mainSprite.alpha = .7;
            
            for (id in state.otherPlayers){
                state.otherPlayers[id].mainSprite.alpha = .7;
            }
        }
        
        if( state.isSelectTargetPhase == true ) {
            state.targetLine.clear();
            state.dashLine.clear();

            state.player.mainSprite.alpha = 1;
            for (id in state.otherPlayers){
                state.otherPlayers[id].mainSprite.alpha = 1;
            }
        }
    })
}

function renderTargetLine(playerPosition, currentMousePosition){
    state.targetLine.clear();
    state.targetLine.lineStyle(1, 0x6666FF, 1);
    state.targetLine.moveTo(playerPosition.x, playerPosition.y);
    state.targetLine.lineTo(currentMousePosition.x, currentMousePosition.y);
}

function renderDashLine(playerPosition, currentMousePosition){
    
    var playerPositionVector = new Vector2(playerPosition.x, playerPosition.y);
    var currentMousePositionVector = new Vector2(currentMousePosition.x, currentMousePosition.y);
    
    state.dashLine.clear();
    state.dashLine.lineStyle(2, 0x66CC33, 1);
    state.dashLine.moveTo(playerPosition.x, playerPosition.y);
    
    var distance = currentMousePositionVector.distance(playerPositionVector);
    
    if (distance <= getGlobalVariables().dashDistance) {
        state.dashLine.lineTo(currentMousePositionVector.x, currentMousePositionVector.y);
    } else {
        // move 3 units to dashed position
        var dashVector = currentMousePositionVector.clone().subtract(playerPositionVector).normalize().scale(getGlobalVariables().dashDistance);
        var dashLimitPosition = playerPositionVector.clone().add(dashVector);
        state.dashLine.lineTo(dashLimitPosition.x, dashLimitPosition.y);
    }
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
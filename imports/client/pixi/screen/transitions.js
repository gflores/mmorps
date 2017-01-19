import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { addCoroutine, constructCoroutine, chainCoroutines } from '/imports/client/pixi/coroutines/coroutine-system.js';


var state = getState();

var movingPhaseDistanceToPixelsRatio = 10;
var battlePhaseDistanceToPixelsRatio = 7;

var movingPhaseGameMapHeight = 620;
var battlePhaseGameMapHeight = 470;


export const transitionFromMovingToDecidingPhase = function(){
    
    var coroutine = constructCoroutine(() => {
        var duration = 0.5;

        var battleControllerYDelta = -getScreenParameters().battleControllerDimensions.height / duration;
        var distancePixelRatioDelta = (battlePhaseDistanceToPixelsRatio - movingPhaseDistanceToPixelsRatio) / duration;
        var gameMapHeightDelta = (battlePhaseGameMapHeight - movingPhaseGameMapHeight) / duration;

        return {
            duration: duration,
            battleControllerYDelta: battleControllerYDelta,
            distancePixelRatioDelta: distancePixelRatioDelta,
            gameMapHeightDelta: gameMapHeightDelta
        };
    }, (data, currentTime) => {
        state.battleController.y += data.battleControllerYDelta * state.currentDeltaTime;
        getScreenParameters().gameDistanceToPixelsRatio += data.distancePixelRatioDelta * state.currentDeltaTime;
        getScreenParameters().gameMapDimensions.height += data.gameMapHeightDelta * state.currentDeltaTime;

        if (currentTime >= data.duration){
            state.battleController.y = getScreenParameters().dimensions.height - getScreenParameters().battleControllerDimensions.height;
            getScreenParameters().gameDistanceToPixelsRatio = battlePhaseDistanceToPixelsRatio;
            getScreenParameters().gameMapDimensions.height = battlePhaseGameMapHeight;

            state.battleController.alpha = 1;
            return false;
        }

        return true;
    });
    addCoroutine(coroutine);
}

function addOtherPlayerDashListener () {
    console.log("players", state.player);
    console.log("other players", state.otherPlayers);
    // state.mapBackground.interactive = true;
    // state.mapBackground.onPointerMove = function (){
    //     if(state.isSelectDashPositionPhase == true){
    //         for (id in state.otherPlayers){
    //             state.otherPlayers[id].mainSprite.alpha = .7;
    //             state.player.mainSprite.alpha = .7;
    //         }    
    //     } else {
    //         for (id in state.otherPlayers){
    //             state.otherPlayers[id].mainSprite.alpha = 1;
    //             state.player.mainSprite.alpha = 1;
    //         }
    //     }
    // }
    state.mapBackground.on('pointermove', () => {
        // should be isDecidingPhase
        if(state.isSelectDashPositionPhase == true ){
    
            state.mapBackground.buttonMode = true;
            state.mapBackground.defaultCursor = 'crosshair';
    
            var currentMousePosition = state.renderer.plugins.interaction.mouse.global;
            var playerPosition = state.player.position.clone();
            convertToScreenValues(playerPosition);
            renderTargetLine(playerPosition, currentMousePosition);
            renderDashLine(playerPosition, currentMousePosition);
    
        }
    
        if( state.isSelectTargetPhase == true ) {
            state.targetLine.clear();
            state.dashLine.clear();
        }
    })
}

export const transitionFromDecidingToResultPhase = function(){
    state.battleController.alpha = 0.6;
    mapBackgroundReset();
    battleControllerSpritesReset();
}

function mapBackgroundReset(){
    state.mapBackground.defaultCursor = 'auto';
    state.targetLine.clear();
    state.dashLine.clear();
    // for debug on main player
    state.player.mainSprite.height = 40;
    state.player.mainSprite.width = 40;
    state.player.mainSprite.x = -20;
    state.player.mainSprite.y = -20;
    state.player.mainSprite.alpha = 1;
    // ------------------------
    for (index in state.otherPlayers){
        state.otherPlayers[index].mainSprite.height = 40;
        state.otherPlayers[index].mainSprite.width = 40;
        state.otherPlayers[index].mainSprite.x = -20;
        state.otherPlayers[index].mainSprite.y = -20;
        
        state.otherPlayers[index].mainSprite.alpha = 1;
    }
}

function battleControllerSpritesReset(){
    state.shieldSprite.y = 15;
    state.shieldSprite.width = 100;
    state.shieldSprite.height = 120;

    state.shieldSpriteColorMatrix.reset();
    
    state.deckSprite.y = 15;
    state.deckSprite.width = 100;
    state.deckSprite.height = 120;

    state.deckSpriteColorMatrix.reset();
    
    state.currentCardOne.x = 0;
    state.currentCardOne.y = 15;
    state.currentCardOne.width = 100;
    state.currentCardOne.height = 120;

    state.currentCardOneColorMatrix.reset();
    
    state.currentCardTwo.y = 15;
    state.currentCardTwo.width = 100;
    state.currentCardTwo.height = 120;

    state.currentCardTwoColorMatrix.reset();

    state.currentCardThree.y = 15;
    state.currentCardThree.width = 100;
    state.currentCardThree.height = 120;
    
    state.currentCardThreeColorMatrix.reset();
}

export const transitionFromResultToMovingPhase = function(){
    var coroutine = constructCoroutine(() => {
        var duration = 0.5;

        var battleControllerYDelta = getScreenParameters().battleControllerDimensions.height / duration;
        var distancePixelRatioDelta = (movingPhaseDistanceToPixelsRatio - battlePhaseDistanceToPixelsRatio) / duration;
        var gameMapHeightDelta = (movingPhaseGameMapHeight - battlePhaseGameMapHeight) / duration;

        return {
            duration: duration,
            battleControllerYDelta: battleControllerYDelta,
            distancePixelRatioDelta: distancePixelRatioDelta,
            gameMapHeightDelta: gameMapHeightDelta
        };
    }, (data, currentTime) => {
        state.battleController.y += data.battleControllerYDelta * state.currentDeltaTime;
        getScreenParameters().gameDistanceToPixelsRatio += data.distancePixelRatioDelta * state.currentDeltaTime;
        getScreenParameters().gameMapDimensions.height += data.gameMapHeightDelta * state.currentDeltaTime;

        if (currentTime >= data.duration){
            state.battleController.y = getScreenParameters().dimensions.height;
            getScreenParameters().gameDistanceToPixelsRatio = movingPhaseDistanceToPixelsRatio;
            getScreenParameters().gameMapDimensions.height = movingPhaseGameMapHeight;

            state.battleController.alpha = 1;
            return false;
        }

        return true;
    });
    addCoroutine(coroutine);
}

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

export const transitionFromDecidingToResultPhase = function(){
    state.battleController.alpha = 0.6;
    battleControllerSpritesReset();
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

import { getApp } from '/imports/ui/App.jsx';


gameState = {
    movingPhaseTime: null,
    decidingPhaseTime: null,
    resultPhaseTime: null,

    isMovingPhase: false,
    isBattlePhase: false,
    isDecidingPhase: false,
    isResultPhase: false,

    renderer: null,
    gameMap: null,
    player: null,
    otherPlayers: {},
    allPlayers: [],
    lastTimeFrame: null,
    currentDeltaTime: null
};


export const getState = function(){
    return gameState;
}

export const getReactState = function(){
    return getApp().state;
}

export const setReactState = function(fields){
    getApp().setState(fields);
}


window.getState = getState;
import { getGlobalVariables } from '/imports/shared/global-variables.js';

var globalData = {
    mainGame: {
        players: {},
        player_keys: [],
        canDuelAction: false,
        canMove: false,
        initialDate: null,
        gameLaunched: false,
        nextMovingPhaseTime: null
    }
};

export const initGameStartDate = () => {
    globalData.mainGame.initialDate = new Date();
};

export const updateNextMovingPhaseTime = (previousMovingPhaseTime) => {
    var roundTime = getGlobalVariables().movingPhaseTime +
                    getGlobalVariables().decidingPhaseTime +
                    getGlobalVariables().resultPhaseTime;
    console.log("previous time", previousMovingPhaseTime);
    previousMovingPhaseTime.setTime(previousMovingPhaseTime.getTime() + roundTime);
    globalData.mainGame.nextMovingPhaseTime = previousMovingPhaseTime;
        console.log("next moving phase time: ", globalData.mainGame.nextMovingPhaseTime);
};

export const getGlobalData = () => {
    return globalData;
};

export const resetGlobalData = () => {
    globalData = {};
};

export const getMainGameData = () => {
    return globalData.mainGame;
};

export const resetMainGameData = () => {
    globalData.mainGame = {
        players: {},
        player_keys: [],
        canDuelAction: false
    };
};

export const enableMainGameDuel = () => {
    globalData.mainGame.canDuelAction = true;
};

export const disableMainGameDuel = () => {
    globalData.mainGame.canDuelAction = false;
};

export const endMainGame = () => {
    console.log("end game called");
    playerKeys = globalData.mainGame.player_keys;
    players = globalData.mainGame.players;
    playerKeys.forEach( (playerKey) => {
        players[playerKey].currentHp = 0 - getGlobalVariables().passiveHealAmount;
    });
};
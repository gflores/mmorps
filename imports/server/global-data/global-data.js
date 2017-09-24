import { passiveHealAmount } from '/imports/shared/global-variables.js';

var globalData = {
    mainGame: {}
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
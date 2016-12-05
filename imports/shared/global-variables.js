var countDownMessageDelay = 500;
var gameStartDelay = 500;
var newRoundDelay = 8000;
var endRoundDelay = 10000;
var shieldHpCost = 5;
var passiveHealAmount = 1;
var gameStartPlayerHp = 30;
var maxHp = 30;

// animation times
var actionSelectedTime = 1;
var actionMoveToCenterTime = 1;
var handMinimizedTime = 1;
var handMaximizedTime = 1;
var actionDoMoveTime = .1;
var actionDoBackTime = 1;
var healthbarShakeTime = .05;
var playAreaMinimizedTime = 1;
var playAreaMaximizedTime = 1;
var playActionContainerDisappearTime = 1;

export const getPlayActionContainerDisappearTime = () => {
    return playActionContainerDisappearTime;
};

export const getPlayAreaMinimizedTime = () => {
    return playAreaMinimizedTime;
};

export const getPlayAreaMaximizedTime = () => {
    return playAreaMaximizedTime;
};

export const getActionDoMoveTime = () => {
    return actionDoMoveTime;
};

export const getActionDoBackTime = () => {
    return actionDoBackTime;
};

export const getHealthbarShakeTime = () => {
    return healthbarShakeTime;
};

export const getActionSelectedTime = () => {
    return actionSelectedTime;
};

export const getActionMoveToCenterTime = () => {
    return actionMoveToCenterTime;
};

export const getHandMinimizedTime = () => {
    return handMinimizedTime;
};

export const getHandMaximizedTime = () => {
    return handMaximizedTime;
};

export const getCountDownMessageDelay = () => {
    return countDownMessageDelay;
};

export const getGameStartDelay = () => {
    return gameStartDelay;
};

export const getNewRoundDelay = () => {
    return newRoundDelay;
};

export const getEndRoundDelay = () => {
    return endRoundDelay;
};

export const getShieldHpCost = () => {
    return shieldHpCost;
};

export const getPassiveHealAmount = () => {
    return passiveHealAmount;
}

export const getGameStartPlayerHp = () => {
    return gameStartPlayerHp;
};

export const getMaxHp = () => {
    return maxHp;
};
var countDownMessageDelay = 500;
var gameStartDelay = 500;
var newRoundDelay = 9000;
var endRoundDelay = 5000;
var shieldHpCost = 5;
var passiveHealAmount = 1;
var gameStartPlayerHp = 30;
var maxHp = 30;

// animation times
var actionSelectedTime = .5;
var actionSelectedTimeDelay = .3;
var actionMoveToCenterTime = .7;
var handMinimizedTime = .5;
var handMaximizedTime = .5;
var actionDoMoveTime = .1;
var actionDoMoveTimeDelay = .3;
var actionReappearTime = .2;
var actionDoBackTime = .5;
var healthbarShakeTime = .05;
var playAreaMinimizedTime = .5;
var playAreaMaximizedTime = .5;
var playActionContainerDisappearTime = .7;

export const getActionDoMoveTimeDelay = () => {
    return actionDoMoveTimeDelay;
};

export const getActionSelectedTimeDelay = () => {
    return actionSelectedTimeDelay;
};

export const getActionReappearTime = () => {
    return actionReappearTime;
};

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
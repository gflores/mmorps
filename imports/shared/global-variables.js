var globalVariables = {
    //MOVING PHASE

    movingPhaseTime: 1000,

    movingToActionPhaseTransitionTime: 500,
    
    decidingPhaseTime: 10000,
    decidingToResultPhaseTransitionTime: 500,
    
    resultPhaseTime: 1000,

    actionToMovingPhaseTransitionTime: 1000,

    countDownMessageDelay: 500,
    gameStartDelay: 500,
    newRoundDelay: 1000,
    endRoundDelay: 1000,
    gameStartPlayerHp: 30,
    maxHp: 30,

    // hp costs
    shieldHpCost: 4,
    notLastCardPlayedHpCost: 1,
    lastCardPlayedHpGain: 2,

    dashDistance: 3,

    // //CLIENT SIDE VARIABLES

    // animation times
    actionSelectedTime: .5,
    actionSelectedTimeDelay: .3,
    actionMoveToCenterTime: .7,
    handMinimizedTime: .5,
    handMaximizedTime: .5,
    actionDoMoveTime: .1,
    actionDoMoveTimeDelay: .3,
    actionReappearTime: .2,
    actionDoBackTime: .5,
    healthbarShakeTime: .05,
    playAreaMinimizedTime: .5,
    playAreaMaximizedTime: .5,
    playActionContainerDisappearTime: .7
}

export const getGlobalVariables = function(){
    return globalVariables;
}


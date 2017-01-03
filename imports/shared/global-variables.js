var globalVariables = {
    //MOVING PHASE

    movingPhaseTime: 3000,

    movingToActionPhaseTransitionTime: 100,
    
    decidingPhaseTime: 3000,
    decidingToResultPhaseTransitionTime: 100,
    
    resultPhaseTime: 100,

    actionToMovingPhaseTransitionTime: 100,

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


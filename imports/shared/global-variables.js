var globalVariables = {
    //MOVING PHASE
    movingPhaseTime: 5000,

    movingToActionPhaseTransitionTime: 2000,
    
    decidingPhaseTime: 5000,
    decidingToResultPhaseTransitionTime: 2000,
    
    resultPhaseTime: 5000,

    actionToMovingPhaseTransitionTime: 2000,

    countDownMessageDelay: 500,
    gameStartDelay: 500,
    newRoundDelay: 1000,
    endRoundDelay: 1000,
    shieldHpCost: 4,
    passiveHealAmount: 1,
    gameStartPlayerHp: 30,
    maxHp: 30,


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


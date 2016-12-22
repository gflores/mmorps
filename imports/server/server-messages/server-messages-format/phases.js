export const constructMovingPhaseStartedMessage = (playerKeys) => {
    return {
        functionId: "moving_phase_started",
        recipients: playerKeys
    }
}

export const constructMovingPhaseEndedMessage = (playerKeys) => {
    return {
        functionId: "moving_phase_ended",
        recipients: playerKeys
    }
}

export const constructBattlePhaseStartedMessage = (playerKeys) => {
    return {
        functionId: "battle_phase_started",
        recipients: playerKeys
    }
}

export const constructBattlePhaseEndedMessage = (playerKeys) => {
    return {
        functionId: "battle_phase_ended",
        recipients: playerKeys
    }
}

export const constructDecidingPhaseStartedMessage = (playerKeys) => {
    return {
        functionId: "deciding_phase_started",
        recipients: playerKeys
    }
}

export const constructDecidingPhaseEndedMessage = (playerKeys) => {
    return {
        functionId: "deciding_phase_ended",
        recipients: playerKeys
    }
}

export const constructResultPhaseStartedMessage = (playerKeys) => {
    return {
        functionId: "result_phase_started",
        recipients: playerKeys
    }
}

export const constructResultPhaseEndedMessage = (playerKeys) => {
    return {
        functionId: "result_phase_ended",
        recipients: playerKeys
    }
}
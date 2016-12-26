import { updateAllPlayerPosition } from '/imports/server/gameplay/position/compute-position.js';

export const constructMovingPhaseStartedMessage = (playerKeys) => {
    return {
        functionId: "moving_phase_started",
        recipients: playerKeys
    }
}

export const constructMovingPhaseEndedMessage = (playerKeys, players) => {

    updateAllPlayerPosition(players);

    var playersInfo = {};

    for ( playerId in players ){
        playersInfo[playerId] = {
            id: playerId,
            finalWantedPosition: players[playerId].finalWantedPosition,
            moveSpeed: players[playerId].moveSpeed,
            position: players[playerId].lastPosition,
            lastUpdatedTime: players[playerId].lastUpdatedTime
        }
    }

    return {
        functionId: "moving_phase_ended",
        recipients: playerKeys,
        players: playersInfo
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
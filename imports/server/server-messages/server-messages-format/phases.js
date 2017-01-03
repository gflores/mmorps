import { updateAllPlayerPosition } from '/imports/server/gameplay/position/compute-position.js';

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

export const constructDecidingPhaseEndedMessage = (playerKeys, players) => {

    

    return {
        functionId: "deciding_phase_ended",
        recipients: playerKeys,
        players: players
    }
}

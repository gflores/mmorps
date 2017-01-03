import { updateAllPlayerPosition } from '/imports/server/gameplay/position/compute-position.js';
import { getGlobalVariables } from '/imports/shared/global-variables.js';


export const constructJoinedGameMessage = (playerJoinedId, gameData) => {
    var players = {};
    playerKeys = gameData.player_keys;

    updateAllPlayerPosition( gameData.players );

    playerKeys.forEach( (playerkey) => {
        players[playerkey] = {
            id: playerkey,
            currentHp: gameData.players[playerkey].currentHp,
            maxHp: gameData.players[playerkey].maxHp,
            currentCards: gameData.players[playerkey].currentCards,
            canPlayShield: gameData.players[playerkey].canPlayShield,
            finalWantedPosition: gameData.players[playerkey].finalWantedPosition,
            moveSpeed: gameData.players[playerkey].moveSpeed,
            position: gameData.players[playerkey].lastPosition,
            lastUpdatedTime: gameData.players[playerkey].lastUpdatedTime
       }
    });
    
    return {
        functionId: "joined_game",
        recipients: [playerJoinedId],
        playerJoinedId: playerJoinedId,
        players: players,
        timeUntilMovingPhaseEnds: getGlobalVariables().movingPhaseTime
    }
};

export const constructAddPlayerMessage = (playerAddedId, playerKeys, player) => {
    var recipients = [];
    var playerInfo = {
        id: playerAddedId,
        currentHp: player.currentHp,
        maxHp: player.maxHp,
        currentCards: player.currentCards,
        canPlayShield: player.canPlayShield,
        finalWantedPosition: player.finalWantedPosition,
        moveSpeed: player.moveSpeed,
        position: player.lastPosition,
        lastUpdatedTime: player.lastUpdatedTime
    };
    
    for (index in playerKeys){
        if(playerKeys[index] != playerAddedId){
            recipients.push(playerKeys[index]);
        }
    }
    return {
        functionId: "add_player",
        recipients: recipients,
        player: playerInfo
    }
};

export const constructRemovedPlayerMessage = (removedPlayerId, playerKeys) => {
    var recipients = [];

    for (index in playerKeys){
        if(playerKeys[index] != removedPlayerId){
            recipients.push(playerKeys[index]);
        }
    }
    
    return {
        functionId: "removed_player",
        recipients: recipients,
        removedPlayerId: removedPlayerId
    }    
}

export const constructChangePlayerDirectionMessage = ( playerChangedDirectionId, playerKeys, player ) => {
    var recipients = [];
    var playerInfo = {
        id: playerChangedDirectionId,
        finalWantedPosition: player.finalWantedPosition,
        moveSpeed: player.moveSpeed,
        position: player.lastPosition,
        lastUpdatedTime: player.lastUpdatedTime
    };
    for (index in playerKeys){
        if(playerKeys[index] != playerChangedDirectionId){
            recipients.push(playerKeys[index]);
        }
    }
    return {
        functionId: "change_player_direction",
        recipients: recipients,
        player: playerInfo
    }
};


//
// export const constructCountDownMessage = (countdownTime) => {
//     return {
//         functionId: "game_countdown",
//         time: countdownTime
//     }
// };
//
// export const constructGameStartedMessage = (gameData) => {
//     var players = {};
//     playerKeys = gameData.player_keys;
//
//     playerKeys.forEach( (playerkey) => {
//         players[playerkey] = {
//            currentHp: gameData.players[playerkey].currentHp,
//            maxHp: gameData.players[playerkey].maxHp,
//            currentCards: gameData.players[playerkey].currentCards,
//            canPlayShield: gameData.players[playerkey].canPlayShield
//        }
//     });
//
//
//
//     return {
//         functionId: "game_started",
//         players: players
//     }
// };
//
// export const constructNewRoundMessage = (timeLimit) => {
//     return {
//         functionId: 'new_round',
//         timeLimit: timeLimit
//     }
// };
//
// export const constructEndRoundMessage = (gameData) => {
//     playerKeys = gameData.player_keys;
//     players = {};
//
//     playerKeys.forEach( (playerKey) => {
//        players[playerKey] = {
//            currentHp: gameData.players[playerKey].currentHp,
//            maxHp: gameData.players[playerKey].maxHp,
//            currentCards: gameData.players[playerKey].currentCards,
//            action: gameData.players[playerKey].action,
//            actionCardIndex: gameData.players[playerKey].actionCardIndex,
//            canPlayShield: gameData.players[playerKey].canPlayShield
//        }
//     });
//
//     return {
//         functionId: "end-of-round",
//         players: players
//     }
// };
//
// export const constructPlayerPositionMessage = ( gameData ) => {
//     playerKeys = gameData.player_keys;
//     players = {};
//
//     playerKeys.forEach( (playerKey) => {
//         players[playerKey] = {
//             lastPosition: gameData.players[playerKey].lastPosition,
//             lastUpdatedTime: gameData.players[playerKey].lastUpdatedTime,
//             currentVelocity: gameData.players[playerKey].currentVelocity,
//             finalWantedPosition: gameData.players[playerKey].finalWantedPosition
//         }
//     });
//
//     return {
//         functionId: "player-positions",
//         players: players
//     }
// };
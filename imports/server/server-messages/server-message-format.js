export const constructJoinedGameMessage = (gameData) => {
    var players = {};
    playerKeys = gameData.player_keys;

    playerKeys.forEach( (playerkey) => {
        players[playerkey] = {
            id: playerkey,
            currentHp: gameData.players[playerkey].currentHp,
            maxHp: gameData.players[playerkey].maxHp,
            currentCards: gameData.players[playerkey].currentCards,
            canPlayShield: gameData.players[playerkey].canPlayShield,
            finalWantedPosition: gameData.players[playerkey].finalWantedPosition,
            moveSpeed: gameData.players[playerkey].moveSpeed,
            renderContainer: gameData.players[playerkey].lastPosition,
            lastUpdatedTime: gameData.players[playerkey].lastUpdatedTime
       }
    });
    return {
        functionId: "joined_game",
        players: players
    }
};

export const constructAddPlayerMessage = (player) => {
    playerInfo = {
        id: Meteor.userId(),
        currentHp: player.currentHp,
        maxHp: player.maxHp,
        currentCards: player.currentCards,
        canPlayShield: player.canPlayShield,
        finalWantedPosition: player.finalWantedPosition,
        moveSpeed: player.moveSpeed,
        renderContainer: player.lastPosition,
        lastUpdatedTime: player.lastUpdatedTime
    };
    return {
        functionId: "add_player",
        player: playerInfo
    }
};

export const constructChangePlayerDirectionMessage = ( player ) => {
    playerInfo = {
        id: Meteor.userId(),
        finalWantedPosition: player.finalWantedPosition,
        moveSpeed: player.moveSpeed,
        renderContainer: player.lastPosition,
        lastUpdatedTime: player.lastUpdatedTime
    };
    return {
        functionId: "change_player_direction",
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
export const getNewRoundMessage = (gameData) => {
    var players = gameData.players;
    var player_keys = gameData.player_keys;

    var playerOne = playerGetFilteredField(players[player_keys[0]], player_keys[0]);
    var playerTwo = playerGetFilteredField(players[player_keys[1]], player_keys[1]);
    return {
        type: 'duel_start',
        players: {
            playerOne,
            playerTwo
        }
    }
};

export const getEndRoundMessage = (gameData) => {
    
};

export const getEndGameMessage = (gameData) => {
    var winnerId, loserId, players, playerKeys;
    players = gameData.players;
    playerKeys = gameData.player_keys;

    playerKeys.forEach( (playerKey) => {
        if (players[playerKey].hp <= 0) {
            winner = playerKey;
        } else {
            loser = playerKey;
        }
    });

    return {
        type: 'end_game_result',
        winnerId: winnerId,
        loserId: loserId
    }
};

playerGetFilteredField= (player, playerId) => {
    return {
        id: playerId,
        currentCards: player.currentCards,
        hp: player.hp
    }
};
export const getJoinedGameMessage = () => {
    return {
        functionId: "joined_game"
    }
};

export const getCountDownMessage = (countdownTime) => {
    return {
        functionId: "game_countdown",
        time: countdownTime
    }
};

export const getGameStartedMessage = (gameData) => {
    var players = {};
    playerKeys = gameData.player_keys;
    
    playerKeys.forEach( (playerkey) => {
       players[playerkey] = {
           hp: gameData.players[playerkey].hp,
           currentCards: gameData.players[playerkey].currentCards
       } 
    });
    
    return {
        functionId: "game_started",
        players: players
    }
};

export const getNewRoundMessage = (timeLimit) => {
    return {
        functionId: 'new_round',
        timeLimit: timeLimit
    }
};

export const getEndRoundMessage = (gameData) => {
    playerKeys = gameData.player_keys;
    players = {};
    
    playerKeys.forEach( (playerKey) => {
       players[playerKey] = {
           hp: gameData.players[playerKey].hp,
           currentCards: gameData.players[playerKey].currentCards,
           action: gameData.players[playerKey].action,
           actionCardIndex: gameData.players[playerKey].actionCardIndex
       } 
    });
    
    return {
        functionId: "end-of-round",
        players: players
    }
};

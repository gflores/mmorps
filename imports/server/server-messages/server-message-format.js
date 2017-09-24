export const constructJoinedGameMessage = () => {
    return {
        functionId: "joined_game"
    }
};

export const constructCountDownMessage = (countdownTime) => {
    return {
        functionId: "game_countdown",
        time: countdownTime
    }
};

export const constructGameStartedMessage = (gameData) => { // out of business in the coop mode
    var players = {};
    playerKeys = gameData.player_keys;
    
    playerKeys.forEach( (playerkey) => {
        players[playerkey] = {
           currentHp: gameData.players[playerkey].currentHp,
           maxHp: gameData.players[playerkey].maxHp,
           currentCards: gameData.players[playerkey].currentCards,
           canPlayShield: gameData.players[playerkey].canPlayShield
       } 
    });

    return {
        functionId: "game_started",
        players: players
    }
};

export const constructGameSnapshotMessage = (gameData) => { // when a user wants to get the latest state of the game
    var players = {};
    playerKeys = gameData.player_keys;
    
    playerKeys.forEach( (playerkey) => {
        players[playerkey] = {
           currentHp: gameData.players[playerkey].currentHp,
           maxHp: gameData.players[playerkey].maxHp,
           currentCards: gameData.players[playerkey].currentCards,
           canPlayShield: gameData.players[playerkey].canPlayShield
       } 
    });

    var now = new Date();

    return {
        functionId: "game_started",
        players: players,
        canDuelAction: gameData.canDuelAction,
        decidingPhaseRoundTime: gameData.canDuelAction ? (now.getTime() - gameData.currentRoundStartTime.getTime()) * 1000 : null
    }
};



export const constructNewRoundMessage = (timeLimit) => {
    return {
        functionId: 'new_round',
        timeLimit: timeLimit
    }
};

export const constructEndRoundMessage = (gameData) => {
    playerKeys = gameData.player_keys;
    players = {};
    
    playerKeys.forEach( (playerKey) => {
       players[playerKey] = {
           currentHp: gameData.players[playerKey].currentHp,
           maxHp: gameData.players[playerKey].maxHp,
           currentCards: gameData.players[playerKey].currentCards,
           action: gameData.players[playerKey].action,
           actionCardIndex: gameData.players[playerKey].actionCardIndex,
           canPlayShield: gameData.players[playerKey].canPlayShield
       } 
    });
    
    return {
        functionId: "end-of-round",
        players: players
    }
};

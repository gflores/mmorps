export const gameEnd = (gameData) => {
    
    var gameEnd = false;
    players = gameData.players;
    playerKeys = gameData.player_keys;
    playerKeys.forEach( (playerKey) => {
       if (players[playerKey].currentHp <= 0) {
           gameEnd = true;
       }
    });
    return gameEnd;
}
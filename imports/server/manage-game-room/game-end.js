export const gameEnd = (gameData) => {
    var gameEnd = false;
    players = gameData.players;
    playerKeys = gameData.player_keys;
    console.log("inside game end logic", players);
    playerKeys.forEach( (playerKey) => {
       if (players[playerKey].hp <= 0) {
           gameEnd = true;
       }
        console.log(players[playerKey]);
        console.log("checking to see if hp is below 0");
    });
    return gameEnd;
}
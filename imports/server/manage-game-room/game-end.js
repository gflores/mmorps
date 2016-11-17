export const gameEnd = (gameData, playerKeys) => {
    var gameEnd = false;
    console.log("inside game end logic", gameData);
    playerKeys.forEach( (playerKey) => {
       if (gameData[playerKey].hp <= 0) {
           gameEnd = true;
       }
        console.log(gameData[playerKey]);
        console.log("checking to see if hp is below 0");
    });
    return gameEnd;
}
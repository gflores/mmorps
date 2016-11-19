export const PlayCard = (playerId, cardIndex, gameData) => {
    if(gameData.players[playerId]){
        gameData.players[playerId].action = 'ATTACK';
        gameData.players[playerId].actionCardIndex = cardIndex;
    }
    console.log(playerId, "playing card", cardIndex, ": ", gameData.players[playerId].currentCards[cardIndex]);
}

export const PlayShield = (playerId, gameData) => {
    if(gameData.players[playerId]){
        gameData.players[playerId].action = 'SHIELD';
    }
    console.log("playing shield");
}

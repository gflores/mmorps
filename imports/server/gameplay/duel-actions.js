export const PlayCard = (playerId, cardIndex, gameData) => {
    if(gameData.players[playerId]){
        gameData.players[playerId].action = 'ATTACK';
        gameData.players[playerId].actionCardIndex = cardIndex;
    }
    console.log("playing card");
}

export const PlayShield = (playerId, gameData) => {
    if(gameData.players[playerId]){
        gameData.players[playerId].action = 'SHIELD';
    }
    console.log("playing shield");
}

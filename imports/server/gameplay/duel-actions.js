export const PlayCard = (playerId, cardIndex, gameData) => {
    if(gameData[playerId]){
        gameData[playerId].action = 'ATTACK';
        gameData[playerId].actionCardIndex = cardIndex;
    }
    console.log("playing card");
}

export const PlayShield = (playerId, gameData) => {
    if(gameData[playerId]){
        gameData[playerId].action = 'SHIELD';
    }
    console.log("playing shield");
}

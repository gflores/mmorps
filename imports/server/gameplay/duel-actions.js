export const PlayCard = (playerId, cardIndex, gameData) => {
    // if player exist, cardIndex's card exist, and can play cards (canDuelAction)
    if(gameData.players[playerId] && cardIndex <= gameData.players[playerId].currentCards.length - 1  && gameData.canDuelAction == true ){
        gameData.players[playerId].action = 'ATTACK';
        gameData.players[playerId].actionCardIndex = cardIndex;
        console.log(playerId, "playing card", cardIndex, ": ", gameData.players[playerId].currentCards[cardIndex]);
    } else {
        console.log(playerId, " Cannot Play Card");
    }
}

export const PlayShield = (playerId, gameData) => {
    if(gameData.players[playerId] && gameData.canDuelAction == true){
        gameData.players[playerId].action = 'SHIELD';
        console.log("playing shield");
    } else {
        console.log(playerId, " Cannot Play Shield");
    }

}

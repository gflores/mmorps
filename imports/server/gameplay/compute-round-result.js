attackingToWaitingPlayer = (attackingPlayer, waitingPlayer) => {
    attackingCard = attackingPlayer.currentCards[attackingPlayer.actionCardIndex];
    attackValue = attackingCard.value;
    waitingPlayer.hp -= attackValue;
    return attackValue;
};

export const computeRoundResult = (gameData) => {

    var attackingValue, playerOneHpDifference, playerTwoHpDifference, playerOneCard, playerTwoCard, playerOneFinalHp, playerTwoFinalHp;
    var endRoundMessage = {};

    playerOne = gameData.players[gameData.player_keys[0]];
    playerTwo = gameData.players[gameData.player_keys[1]];
    
    console.log("player one's hand", playerOne.currentCards);
    console.log("player two's hand", playerTwo.currentCards);

    if (playerOne.action == 'ATTACK' && playerTwo.action == 'ATTACK'){
        playerOneCard = playerOne.currentCards[playerOne.actionCardIndex];
        playerTwoCard = playerTwo.currentCards[playerTwo.actionCardIndex];

        result = getResult(playerOneCard.element, playerTwoCard.element);


        if (result == 1) {
            attackValue = playerOneCard.value + playerTwoCard.value;
            playerOne.hp += attackValue;
            playerTwo.hp -= attackValue;
        } else if (result == 0) {
            attackValue = playerOneCard.value - playerTwoCard.value;
            if (attackValue > 0) {
                playerTwo.hp -= attackValue;
            } else {
                playerOne.hp += attackValue;
            }
        } else if (result == -1) {
            attackValue = playerOneCard.value + playerTwoCard.value;
            playerOne.hp -= attackValue;
            playerTwo.hp += attackValue;
        }

        playerOne.currentCards.splice(playerOne.actionCardIndex, 1);
        playerTwo.currentCards.splice(playerTwo.actionCardIndex, 1);
    } else if (playerOne.action == 'ATTACK' && playerTwo.action == 'SHIELD') {
        playerOneCard = playerOne.currentCards[playerOne.actionCardIndex];
        playerTwo.hp -= 5;
        attackValue = playerOneCard.value;
        playerOne.hp -= attackValue;

        playerOne.currentCards.splice(playerOne.actionCardIndex, 1);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'ATTACK') {
        playerTwoCard = playerTwo.currentCards[playerTwo.actionCardIndex];
        playerTwo.hp -= 5;
        attackValue = playerTwoCard.value;
        playerTwo.hp -= attackValue;

        playerTwo.currentCards.splice(playerTwo.actionCardIndex, 1);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'SHIELD'){
        playerOne.hp -= 5;
        playerTwo.hp -= 5;
    } else if (playerOne.action == 'ATTACK' && playerTwo.action == null) {
        attackingToWaitingPlayer(playerOne, playerTwo);
    } else if (playerOne.action == null && playerTwo.action == 'ATTACK') {
        attackingToWaitingPlayer(playerTwo, playerOne);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == null ) {
        playerOne.hp -= 5;
    } else if (playerOne.action == null && playerTwo.action == 'SHIELD') {
        playerTwo.hp -= 5;
    } else if (playerOne.action == null && playerTwo.action == null) {
        
    }

    // reset player's actions
    playerOne.action = null;
    playerOne.actionCardIndex = null;
    playerTwo.action = null;
    playerTwo.actionCardIndex = null;
    
    // if player's hand is empty, reload 3 new cards
    if(playerOne.currentCards.length == 0){
        newCards = [];
        newCards.push(playerOne.remainingCardStack.pop());
        newCards.push(playerOne.remainingCardStack.pop());
        newCards.push(playerOne.remainingCardStack.pop());
        playerOne.currentCards = newCards;
    }

    if (playerTwo.currentCards.length == 0) {
        newCards = [];
        newCards.push(playerTwo.remainingCardStack.pop());
        newCards.push(playerTwo.remainingCardStack.pop());
        newCards.push(playerTwo.remainingCardStack.pop());
        playerTwo.currentCards = newCards;
    }

    console.log(gameData);
    
}
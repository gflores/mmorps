import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getDuelStartedMessage, getEndRoundMessage } from '/imports/server/server-messages/server-message-format.js';

import { getResult } from '/imports/server/gameplay/cards/cards.js';

strongerToWeakerPlayer = (strongerPlayer, weakerPlayer) => {
    strongCard = strongerPlayer.currentCards[strongerPlayer.actionCardIndex];
    weakCard = weakerPlayer.currentCards[weakerPlayer.actionCardIndex];
    attackValue = strongCard.value + weakCard.value;
    strongerPlayer.hp += attackValue;
    weakerPlayer.hp -= attackValue;

    discardPlayedCard(strongerPlayer);
    discardPlayedCard(weakerPlayer);
};

sameSuitPlayersDuel = (playerOne, playerTwo) => {
    attackValue = playerOneCard.value - playerTwoCard.value;
    if (attackValue > 0) {
        playerTwo.hp -= attackValue;
    } else {
        playerOne.hp += attackValue;
    }

    discardPlayedCard(playerOne);
    discardPlayedCard(playerTwo);
};

attackingToWaitingPlayer = (attackingPlayer, waitingPlayer) => {
    attackingCard = attackingPlayer.currentCards[attackingPlayer.actionCardIndex];
    console.log("attacking card", attackingCard);
    attackValue = attackingCard.value;
    waitingPlayer.hp -= attackValue;

    discardPlayedCard(attackingPlayer);
};

defendingToWaitingPlayer = (defendingPlayer) => {
    defendingPlayer.hp -= 5;
};

attackingToDefendingPlayer = (attackingPlayer, defendingPlayer) => {
    attackingCard = attackingPlayer.currentCards[attackingPlayer.actionCardIndex];
    attackingValue = attackingCard.value;
    defendingPlayer.hp -= 5;
    attackingPlayer.hp -= attackingValue;

    discardPlayedCard(attackingPlayer);
};

defendingToDefendingPlayer = (defendingPlayerOne, defendingPlayerTwo) => {
    defendingPlayerOne.hp -= 5;
    defendingPlayerTwo.hp -= 5;
};

resetPlayerActions = (player) => {
    player.action = null;
    player.actionCardIndex = null;
};

drawCardsIfEmpty = (player) => {
    // if player's hand is empty, reload 3 new cards
    if(player.currentCards.length == 0){
        newCards = [];
        newCards.push(player.remainingCardsStack.pop());
        newCards.push(player.remainingCardsStack.pop());
        newCards.push(player.remainingCardsStack.pop());
        player.currentCards = newCards;
    }
};

// prepareForNextRound = (playerOne, playerTwo) => {
//     drawCardsIfEmpty(playerOne);
//     drawCardsIfEmpty(playerTwo);
//
//     resetPlayerActions(playerOne);
//     resetPlayerActions(playerTwo);
//
// };

discardPlayedCard = (player) => {
    player.currentCards.splice(player.actionCardIndex, 1);
};

export const computeRoundResult = (gameData) => {

    playerOne = gameData.players[gameData.player_keys[0]];
    playerTwo = gameData.players[gameData.player_keys[1]];

    if (playerOne.action == 'ATTACK' && playerTwo.action == 'ATTACK'){
        playerOneCard = playerOne.currentCards[playerOne.actionCardIndex];
        playerTwoCard = playerTwo.currentCards[playerTwo.actionCardIndex];

        result = getResult(playerOneCard.element, playerTwoCard.element);

        if (result == 1) {
            strongerToWeakerPlayer(playerOne, playerTwo);
        } else if (result == 0) {
            sameSuitPlayersDuel(playerOne, playerTwo);
        } else if (result == -1) {
            strongerToWeakerPlayer(playerTwo, playerOne);
        }

    } else if (playerOne.action == 'ATTACK' && playerTwo.action == 'SHIELD') {
        attackingToDefendingPlayer(playerOne, playerTwo);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'ATTACK') {
        attackingToDefendingPlayer(playerTwo, playerOne);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'SHIELD'){
        defendingToDefendingPlayer(playerOne, playerTwo);
    } else if (playerOne.action == 'ATTACK' && playerTwo.action == null) {
        attackingToWaitingPlayer(playerOne, playerTwo);
    } else if (playerOne.action == null && playerTwo.action == 'ATTACK') {
        attackingToWaitingPlayer(playerTwo, playerOne);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == null ) {
        defendingToWaitingPlayer(playerOne);
    } else if (playerOne.action == null && playerTwo.action == 'SHIELD') {
        defendingToWaitingPlayer(playerTwo);
    } else if (playerOne.action == null && playerTwo.action == null) {
        
    }

    // reset players Actions and draw cards if hands are empty
    // prepareForNextRound(playerOne, playerTwo);

    drawCardsIfEmpty(playerOne);
    drawCardsIfEmpty(playerTwo);

    sendMainServerMessage(getEndRoundMessage(gameData));

    resetPlayerActions(playerOne);
    resetPlayerActions(playerTwo);
}
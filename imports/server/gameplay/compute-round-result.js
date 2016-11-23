import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getDuelStartedMessage, constructEndRoundMessage } from '/imports/server/server-messages/server-message-format.js';
import { getShieldHpCost, getMaxHp } from '/imports/shared/global-variables.js';

import { getResult } from '/imports/server/gameplay/cards/cards.js';

function attackToAttack(playerOne, playerTwo) {
    playerOneCard = getPlayedCard(playerOne);
    playerTwoCard = getPlayedCard(playerTwo);

    result = getResult(playerOneCard.element, playerTwoCard.element);

    if (result == 1) {
        strongerToWeakerPlayer(playerOne, playerTwo);
    } else if (result == 0) {
        sameSuitPlayersDuel(playerOne, playerTwo);
    } else if (result == -1) {
        strongerToWeakerPlayer(playerTwo, playerOne);
    }
}

function strongerToWeakerPlayer(strongerPlayer, weakerPlayer) {
    strongCard = getPlayedCard(strongerPlayer);
    weakCard = getPlayedCard(weakerPlayer);
    attackValue = strongCard.value + weakCard.value;
    weakerPlayer.currentHp -= attackValue;

    discardPlayedCard(strongerPlayer);
    discardPlayedCard(weakerPlayer);
};

function sameSuitPlayersDuel(playerOne, playerTwo) {
    
    playerOneAttackPower = getPlayedCard(playerOne).value;
    playerTwoAttackPower = getPlayedCard(playerTwo).value;
    
    if(playerOneAttackPower > playerTwoAttackPower) {
        strongerPlayer = playerOne;
        weakerPlayer = playerTwo;
    } else if (playerOneAttackPower == playerTwoAttackPower ) {
        
    } else {
        strongerPlayer = playerTwo;
        weakerPlayer = playerOne;
    }
    
    dealingNormalDamage(strongerPlayer, weakerPlayer);
    healingNormalHealth(weakerPlayer, strongerPlayer);
    
};

function dealingNormalDamage(attackingPlayer, damagedPlayer){
    attackingValue = getPlayedCard(attackingPlayer).value;
    damagedPlayer.currentHp -= attackingValue;
    discardPlayedCard(attackingPlayer);
};

function healingNormalHealth(healer, healedPlayer){
    healingValue = getPlayedCard(healer).value;
    healedPlayer.currentHp += healingValue;
    if (healedPlayer.currentHp >= getMaxHp()){
        healedPlayer.currentHp = getMaxHp();
    }
    discardPlayedCard(healer);
};

function playShield(player) {
    player.currentHp -= getShieldHpCost();
};

function attackDeflected(attackingPlayer) {
    attackingValue = getPlayedCard(attackingPlayer).value;
    attackingPlayer.currentHp -= attackingValue;

    discardPlayedCard(attackingPlayer);
};

resetPlayerActions = (player) => {
    player.action = null;
    player.actionCardIndex = null;
};

function drawCardsIfEmpty(player) {
    // if player's hand is empty, reload 3 new cards
    if(player.currentCards.length == 0){
        newCards = [];
        newCards.push(player.remainingCardsStack.pop());
        newCards.push(player.remainingCardsStack.pop());
        newCards.push(player.remainingCardsStack.pop());
        player.currentCards = newCards;
    }
};

function discardPlayedCard(player) {
    player.currentCards.splice(player.actionCardIndex, 1);
};

function getPlayedCard(player) {
    return player.currentCards[player.actionCardIndex];
}

export const computeRoundResult = (gameData) => {

    playerOne = gameData.players[gameData.player_keys[0]];
    playerTwo = gameData.players[gameData.player_keys[1]];

    if (playerOne.action == 'ATTACK' && playerTwo.action == 'ATTACK'){
        attackToAttack(playerOne, playerTwo);
    } else if (playerOne.action == 'ATTACK' && playerTwo.action == 'SHIELD') {
        playShield(playerTwo);
        attackDeflected(playerOne);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'ATTACK') {
        playShield(playerOne);
        attackDeflected(playerTwo);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'SHIELD'){
        playShield(playerOne);
        playShield(playerTwo);
    } else if (playerOne.action == 'ATTACK' && playerTwo.action == null) {
        dealingNormalDamage(playerOne, playerTwo);
    } else if (playerOne.action == null && playerTwo.action == 'ATTACK') {
        dealingNormalDamage(playerTwo, playerOne);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == null ) {
        playShield(playerOne);
    } else if (playerOne.action == null && playerTwo.action == 'SHIELD') {
        playShield(playerTwo);
    } else if (playerOne.action == null && playerTwo.action == null) {
        
    }

    // reset players Actions and draw cards if hands are empty
    // prepareForNextRound(playerOne, playerTwo);

    drawCardsIfEmpty(playerOne);
    drawCardsIfEmpty(playerTwo);

    sendMainServerMessage(constructEndRoundMessage(gameData));

    resetPlayerActions(playerOne);
    resetPlayerActions(playerTwo);
}
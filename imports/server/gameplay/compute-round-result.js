import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getDuelStartedMessage, constructEndRoundMessage } from '/imports/server/server-messages/server-message-format.js';
import { shieldHpCost, maxHp, passiveHealAmount } from '/imports/shared/global-variables.js';

import { getResult, generateStartingCards } from '/imports/server/gameplay/cards/cards.js';
import { isCurrentHandEmpty } from '/imports/server/gameplay/players/is-current-hand-empty.js';

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
    
    enablePlayerShield(playerOne);
    enablePlayerShield(playerTwo);
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
        discardPlayedCard(playerOne);
        discardPlayedCard(playerTwo);
        return;
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
    enablePlayerShield(attackingPlayer);
};

function healingNormalHealth(healer, healedPlayer){
    healingValue = getPlayedCard(healer).value;
    healedPlayer.currentHp += healingValue;
    if (healedPlayer.currentHp >= maxHp){
        healedPlayer.currentHp = maxHp;
    }
    discardPlayedCard(healer);
    enablePlayerShield(healer);
};

function healPassivePlayer(passivePlayer){
    passivePlayer.currentHp += passiveHealAmount;
    if(passivePlayer.currentHp >= maxHp){
        passivePlayer.currentHp = maxHp;
    }
    enablePlayerShield(passivePlayer);
};

function playShield(player) {
    player.currentHp -= shieldHpCost;
    disablePlayerShield(player);
};

function attackDeflected(attackingPlayer) {
    attackingValue = getPlayedCard(attackingPlayer).value;
    attackingPlayer.currentHp -= attackingValue;

    discardPlayedCard(attackingPlayer);
    enablePlayerShield(attackingPlayer);
};

function enablePlayerShield(player){
    player.canPlayShield = true;
};

function disablePlayerShield(player){
    player.canPlayShield = false;
}

function resetPlayerActions(player) {
    player.action = null;
    player.actionCardIndex = null;
};

function drawCardsIfEmpty(player) {
    // if player's hand is empty, reload 3 new cards
    if(isCurrentHandEmpty(player)){
        newCards = [];
        newCards.push(player.remainingCardsStack.pop());
        newCards.push(player.remainingCardsStack.pop());
        newCards.push(player.remainingCardsStack.pop());
        player.currentCards = newCards;
    }
};

function generateNewDeckIfEmpty(player){
    if(player.remainingCardsStack.length == 0){
        player.remainingCardsStack = generateStartingCards();
    }
}

function discardPlayedCard(player) {
    player.currentCards[player.actionCardIndex] = null;
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
        healPassivePlayer(playerTwo);
        dealingNormalDamage(playerOne, playerTwo);
    } else if (playerOne.action == null && playerTwo.action == 'ATTACK') {
        healPassivePlayer(playerOne);
        dealingNormalDamage(playerTwo, playerOne);
    } else if (playerOne.action == 'SHIELD' && playerTwo.action == null ) {
        healPassivePlayer(playerTwo);
        playShield(playerOne);
    } else if (playerOne.action == null && playerTwo.action == 'SHIELD') {
        healPassivePlayer(playerOne);
        playShield(playerTwo);
    } else if (playerOne.action == null && playerTwo.action == null) {
        healPassivePlayer(playerOne);
        healPassivePlayer(playerTwo);
    }

    // reset players Actions and draw cards if hands are empty
    // prepareForNextRound(playerOne, playerTwo);
    drawCardsIfEmpty(playerOne);
    drawCardsIfEmpty(playerTwo);

    generateNewDeckIfEmpty(playerOne);
    generateNewDeckIfEmpty(playerTwo);

    sendMainServerMessage(constructEndRoundMessage(gameData));

    resetPlayerActions(playerOne);
    resetPlayerActions(playerTwo);
}
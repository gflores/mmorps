import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getDuelStartedMessage, constructEndRoundMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';
import { getGlobalVariables } from '/imports/shared/global-variables.js';

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

    playedCardHpCost(playerOne);
    playedCardHpCost(playerTwo);

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
    playedCardHpCost(attackingPlayer);
    enablePlayerShield(attackingPlayer);
};

function healingNormalHealth(healer, healedPlayer){
    healingValue = getPlayedCard(healer).value;
    healedPlayer.currentHp += healingValue;
    if (healedPlayer.currentHp >= getGlobalVariables.maxHp){
        healedPlayer.currentHp = getGlobalVariables.maxHp;
    }
    discardPlayedCard(healer);
    enablePlayerShield(healer);
};

function healPlayer(player, healAmount){
    player.currentHp += healAmount;
    if(player.currentHp >= getGlobalVariables.maxHp){
        player.currentHp = getGlobalVariables.maxHp;
    }
};

function damagePlayer(player, damageAmount){
    player.currentHp -= healAmount;
}

function playedCardHpCost(player){
    if(isCurrentHandEmpty(player)){
        healPlayer(player, getGlobalVariables().lastCardPlayedHpGain)
    } else {
        damagePlayer(player, getGlobalVariables().notLastCardPlayedHpCost);
    }
}

function playShield(player) {
    player.currentHp -= getGlobalVariables().shieldHpCost;
    disablePlayerShield(player);
};

function attackDeflected(attackingPlayer) {
    attackingValue = getPlayedCard(attackingPlayer).value;
    attackingPlayer.currentHp -= attackingValue;

    discardPlayedCard(attackingPlayer);
    playedCardHpCost(attackingPlayer);
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

function drawCards(player){
    newCards = [];
    newCards.push(player.remainingCardsStack.pop());
    newCards.push(player.remainingCardsStack.pop());
    newCards.push(player.remainingCardsStack.pop());
    player.currentCards = newCards;
}

function drawCardsIfEmpty(player) {
    // if player's hand is empty, reload 3 new cards
    if(isCurrentHandEmpty(player)){
        drawCards(player);
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
    } else if (playerOne.action == 'ATTACK' && (playerTwo.action == null || playerTwo.action == 'DRAW')) {
        enablePlayerShield(playerTwo);
        dealingNormalDamage(playerOne, playerTwo);
    } else if ((playerOne.action == null || playerOne.action == 'DRAW') && playerTwo.action == 'ATTACK') {
        enablePlayerShield(playerOne);
        dealingNormalDamage(playerTwo, playerOne);
    } else if (playerOne.action == 'SHIELD' && (playerTwo.action == null || playerTwo.action == 'DRAW') ) {
        enablePlayerShield(playerTwo);
        playShield(playerOne);
    } else if ((playerOne.action == null || playerOne.action == 'DRAW') && playerTwo.action == 'SHIELD') {
        enablePlayerShield(playerOne);
        playShield(playerTwo);
    } else if ( (playerOne.action == null || playerOne.action == 'DRAW') &&
                (playerTwo.action == null || playerTwo.action == 'DRAW')) {
        enablePlayerShield(playerOne);
        enablePlayerShield(playerTwo);
    }

    // reset players Actions and draw cards if hands are empty
    // prepareForNextRound(playerOne, playerTwo);
    drawCardsIfEmpty(playerOne);
    drawCardsIfEmpty(playerTwo);

    if(playerOne.action == 'DRAW'){
        drawCards(playerOne);
    }
    if(playerTwo.action == 'DRAW'){
        drawCards(playerTwo);
    }

    generateNewDeckIfEmpty(playerOne);
    generateNewDeckIfEmpty(playerTwo);

    sendMainServerMessage(constructEndRoundMessage(gameData));

    resetPlayerActions(playerOne);
    resetPlayerActions(playerTwo);
}
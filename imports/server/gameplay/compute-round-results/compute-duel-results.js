import { sendMainServerMessage } from '/imports/server/server-messages/main-server-messages.js';
import { getDuelStartedMessage, constructEndRoundMessage } from '/imports/server/server-messages/server-messages-format/server-message-format.js';
import { getGlobalVariables } from '/imports/shared/global-variables.js';

import { getResult, generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

function attackToAttack(playerOne, playerTwo) {
    playerOneCard = getPlayedCard(playerOne);
    playerTwoCard = getPlayedCard(playerTwo);

    result = getResult(playerOneCard.element, playerTwoCard.element);

    if (result == 1) {
        strongerToWeakerPlayer(playerOne, playerTwo);
    } else if (result == 0) {
        sameSuitPlayersDuel(playerOne, playerTwo);
    }
    
}

function strongerToWeakerPlayer(strongerPlayer, weakerPlayer) {
    strongCard = getPlayedCard(strongerPlayer);
    weakCard = getPlayedCard(weakerPlayer);
    attackValue = strongCard.value + weakCard.value;
    weakerPlayer.currentHp -= attackValue;
    
};

function sameSuitPlayersDuel(playerOne, playerTwo) {
    
    playerOneAttackPower = getPlayedCard(playerOne).value;
    playerTwoAttackPower = getPlayedCard(playerTwo).value;
    
    if(playerOneAttackPower > playerTwoAttackPower) {
        strongerPlayer = playerOne;
        weakerPlayer = playerTwo;
    } else {
        return;
    } 
    
    dealingNormalDamage(strongerPlayer, weakerPlayer);
    healingNormalHealth(weakerPlayer, strongerPlayer);
    
};

function dealingNormalDamage(attackingPlayer, damagedPlayer){
    attackingValue = getPlayedCard(attackingPlayer).value;
    damagedPlayer.currentHp -= attackingValue;
    
};

function healingNormalHealth(healer, healedPlayer){
    healingValue = getPlayedCard(healer).value;
    healedPlayer.currentHp += healingValue;
    if (healedPlayer.currentHp >= getGlobalVariables.maxHp){
        healedPlayer.currentHp = getGlobalVariables.maxHp;
    }
    
};

function attackDeflected(attackingPlayer) {
    attackingValue = getPlayedCard(attackingPlayer).value;
    attackingPlayer.currentHp -= attackingValue;
    
    
};

function getPlayedCard(player) {
    return player.currentCards[player.actionCardIndex];
}

export const computeDuelResult = (playerOne, playerTwo) => {
    
    if (playerOne.action == 'ATTACK' && playerTwo.action == 'ATTACK'){
        attackToAttack(playerOne, playerTwo);
    } else if (playerOne.action == 'ATTACK' && playerTwo.action == 'SHIELD') {
        attackDeflected(playerOne);
    } else if (playerOne.action == 'ATTACK' && (playerTwo.action == null || playerTwo.action == 'DRAW')) {
        dealingNormalDamage(playerOne, playerTwo);
    }
    
}
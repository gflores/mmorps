import { getGlobalVariables } from '/imports/shared/global-variables.js';
import { isCurrentHandEmpty } from '/imports/server/gameplay/players/is-current-hand-empty.js';

export const computeActionHpCosts = ( player ) => {

    if (player.action == 'ATTACK'){
        playedCard(player);
        discardPlayedCard(player);
    } else if (player.action == 'SHIELD'){
        playShield(player);
    } else if (player.action == 'DRAW'){
        drawCards(player);
    }

    resetPlayerActions(player);
}

function drawCards(player){
    newCards = [];
    newCards.push(player.remainingCardsStack.pop());
    newCards.push(player.remainingCardsStack.pop());
    newCards.push(player.remainingCardsStack.pop());
    player.currentCards = newCards;
}

function discardPlayedCard(player) {
    player.currentCards[player.actionCardIndex] = null;
};

function playShield(player) {
    player.currentHp -= getGlobalVariables().shieldHpCost;
    disablePlayerShield(player);
};

function playedCard(player){
    if(isCurrentHandEmpty(player)){
        healPlayer(player, getGlobalVariables().lastCardPlayedHpGain)
    } else {
        damagePlayer(player, getGlobalVariables().notLastCardPlayedHpCost);
    }
    enablePlayerShield(player);
}

function enablePlayerShield(player){
    player.canPlayShield = true;
};

function disablePlayerShield(player){
    player.canPlayShield = false;
}
function healPlayer(player, healAmount){
    player.currentHp += healAmount;
    if(player.currentHp >= getGlobalVariables.maxHp){
        player.currentHp = getGlobalVariables.maxHp;
    }
};

function damagePlayer(player, damageAmount){
    player.currentHp -= damageAmount;
}

function resetPlayerActions(player) {
    player.action = null;
    player.actionCardIndex = null;
};
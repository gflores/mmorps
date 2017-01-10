
import { isCurrentHandEmpty } from '/imports/server/gameplay/players/is-current-hand-empty.js';
import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

export const computePlayerCardsAndDeck = (player) => {
    // reset players Actions and draw cards if hands are empty
    // prepareForNextRound(playerOne, playerTwo);
    drawCardsIfEmpty(player);
    
    generateNewDeckIfEmpty(player);
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

function drawCards(player){
    newCards = [];
    newCards.push(player.remainingCardsStack.pop());
    newCards.push(player.remainingCardsStack.pop());
    newCards.push(player.remainingCardsStack.pop());
    player.currentCards = newCards;
}
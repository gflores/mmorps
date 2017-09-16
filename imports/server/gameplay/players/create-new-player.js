import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

import { gameStartPlayerHp, maxHp } from '/imports/shared/global-variables.js';
import globalVariables from '/imports/shared/global-variables.js';

export const createNewPlayer = () => {
    hand = [];
    
    deck = generateStartingCards();

    hand.push(deck.pop());
    hand.push(deck.pop());
    hand.push(deck.pop());

    console.log("gameStartPlayerHp: ", gameStartPlayerHp, " maxhp: ", maxHp);
    newPlayer = {
        currentHp: gameStartPlayerHp, 
        maxHp: maxHp,
        currentCards: hand,
        remainingCardsStack: deck,
        action: null,
        actionCardIndex: null,
        canPlayShield: true
    };
    return newPlayer;
}
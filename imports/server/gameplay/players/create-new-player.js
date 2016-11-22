import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

import { getGameStartPlayerHp, getMaxHp } from '/imports/shared/global-variables.js';

export const createNewPlayer = () => {
    hand = [];
    
    deck = generateStartingCards();

    hand.push(deck.pop());
    hand.push(deck.pop());
    hand.push(deck.pop());

    newPlayer = {
        currentHp: getGameStartPlayerHp(), 
        maxHp: getMaxHp(),
        currentCards: hand,
        remainingCardsStack: deck,
        action: null,
        actionCardIndex: null
    };
    return newPlayer;
}
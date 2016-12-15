import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

import { getGameStartPlayerHp, getMaxHp } from '/imports/shared/global-variables.js';

import { Vector2 } from '/imports/helpers/vector2.js';

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
        actionCardIndex: null,
        canPlayShield: true,
        lastPosition: new Vector2(0, 0),
        lastUpdatedTime: new Date(),
        currentVelocity: new Vector2(0, 0),
        finalWantedPosition: null
    };
    return newPlayer;
}
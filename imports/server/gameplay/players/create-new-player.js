import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

import { getGlobalVariables } from '/imports/shared/global-variables.js';

import { Vector2 } from '/imports/helpers/vector2.js';
import { generateRandomPosition } from '/imports/helpers/generateRandomVector.js';

export const createNewPlayer = () => {
    hand = [];
    
    deck = generateStartingCards();

    hand.push(deck.pop());
    hand.push(deck.pop());
    hand.push(deck.pop());

    var randomVector = generateRandomPosition(6, 6);
    
    newPlayer = {
        id: Meteor.userId(),
        currentHp: getGlobalVariables().gameStartPlayerHp, 
        maxHp: getGlobalVariables().maxHp,
        currentCards: hand,
        remainingCardsStack: deck,
        action: null,
        actionCardIndex: null,
        canPlayShield: true,
        lastPosition: randomVector,
        lastUpdatedTime: new Date(),
        moveSpeed: 5,
        finalWantedPosition: null
    };
    return newPlayer;
}

// generateRandomVector(9, 6);
// generateRandomVector(6, 6);

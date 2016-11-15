import { getPlayerKeys } from '/imports/server/manage-game-room/player-keys.js';
import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

export const createNewPlayer = (gameData, userId) => {
    hand = [];
    playerKeys = getPlayerKeys();

    deck = generateStartingCards();

    hand.push(deck.pop());
    hand.push(deck.pop());
    hand.push(deck.pop());

    newPlayer = {
        hp: 100,
        currentCards: hand,
        remainingCardsStack: deck,
        action: null,
        actionCardIndex: null
    };
    return newPlayer;
}
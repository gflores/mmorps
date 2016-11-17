import { getPlayerKeys } from '/imports/server/manage-game-room/player-keys.js';
import { generateStartingCards } from '/imports/server/gameplay/cards/cards.js';

export const createNewPlayer = (userId) => {
    hand = [];
    playerKeys = getPlayerKeys();
    playerKeys.push(userId);
    deck = generateStartingCards();

    hand.push(deck.pop());
    hand.push(deck.pop());
    hand.push(deck.pop());

    newPlayer = {
        hp: 5, // 5 health for testing purposes so game ends quick
        currentCards: hand,
        remainingCardsStack: deck,
        action: null,
        actionCardIndex: null
    };
    return newPlayer;
}
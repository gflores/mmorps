var cards = [];

Construct = (value, element) => {
    return {
        value: value,
        element: element
    }
};

export const CardElements = {
    SCISSOR: "SCISSOR",
    ROCK: "ROCK",
    PAPER: "PAPER"  
};

NotLastThreeTheSameElement = (cards) => { //doesn't seem to work ?
    var card, element, i, index, len, results;
    if (cards[cards.length - 1].element === cards[cards.length - 2].element && cards[cards.length - 2].element === cards[cards.length - 3].element) {
        element = cards[cards.length - 1].element;
        results = [];
        for (index = i = 0, len = cards.length; i < len; index = ++i) {
            card = cards[index];
            if (card.element !== element) {
                cards[index] = cards[cards.length - 1];
                cards[cards.length - 1] = card;
                break;
            } else {
                results.push(void 0);
            }
        }
        return results;
    }
};

ShuffleArray = (arr) => {
    var i, j;
    i = arr.length;
    if (!(i > 0)) {
        return arr;
    }
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};




export const generateStartingCards = () => {
    
    var card_elements, element, i, j, len, len1, ref, ref1, startingCards, value;
    card_elements = CardElements;
    startingCards = [];
    ref = [card_elements.ROCK, card_elements.PAPER, card_elements.SCISSOR];
    for (i = 0, len = ref.length; i < len; i++) {
        element = ref[i];
        ref1 = [2, 3, 5, 7, 8];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
            value = ref1[j];
            startingCards.push(Construct(value, element));
        }
    }
    // console.log("generated cards: " + (JSON.stringify(startingCards)));
    ShuffleArray(startingCards);
    NotLastThreeTheSameElement(startingCards);
    // console.log("generated cards: " + (JSON.stringify(startingCards)));
    return startingCards;
};

IsStrongAgainst = (subject, target) => {
    if ((subject === CardElements.SCISSOR && target === CardElements.PAPER) || (subject === CardElements.PAPER && target === CardElements.ROCK) || (subject === CardElements.ROCK && target === CardElements.SCISSOR)) {
        return true;
    } else {
        return false;
    }
};

IsWeakAgainst = (subject, target) => {
    if ((subject === CardElements.PAPER && target === CardElements.SCISSOR) || (subject === CardElements.ROCK && target === CardElements.PAPER) || (subject === CardElements.SCISSOR && target === CardElements.ROCK)) {
        return true;
    } else {
        return false;
    }
};

export const getResult = (subject, target) => {
    if (subject === target) {
        return 0;
    }
    if (IsStrongAgainst(subject, target)) {
        return 1;
    }
    if (IsWeakAgainst(subject, target)) {
        return -1;
    }
    throw new Meteor.Error(500, "subject: " + (JSON.stringify(subject)) + ", target: " + (JSON.stringify(target)));

};
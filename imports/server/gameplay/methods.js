import { PlayCard, PlayShield } from '/imports/server/gameplay/duel-actions.js';

import { getGameData } from '/imports/server/game-data/game-data.js';

Meteor.methods({
    PlayCard: (cardIndex) => {
        PlayCard(Meteor.userId(), cardIndex, getGameData());
    },

    PlayShield: () => {
        PlayShield(Meteor.userId(), getGameData());
    }
})

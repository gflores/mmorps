import { PlayCard, PlayShield } from '/imports/server/gameplay/duel-actions.js';

import { getMainGameData } from '/imports/server/global-data/global-data.js';

Meteor.methods({
    PlayCard: (cardIndex) => {
        PlayCard(Meteor.userId(), cardIndex, getMainGameData());
    },

    PlayShield: () => {
        PlayShield(Meteor.userId(), getMainGameData());
    }
})

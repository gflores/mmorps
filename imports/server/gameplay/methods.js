import { PlayCard, PlayShield } from '/imports/server/gameplay/duel-actions.js';

import { getMainGameData } from '/imports/server/global-data/global-data.js';


import { LaunchAsync } from '/imports/helpers/async.js';

Meteor.methods({
    PlayCard: (cardIndex, x, y, target) => {
        PlayCard(Meteor.userId(), cardIndex, getMainGameData(), x, y, target);
    },

    PlayShield: () => {
        PlayShield(Meteor.userId(), getMainGameData());
    }
})

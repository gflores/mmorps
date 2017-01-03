import { PlayCard, PlayShield, Dash, PickTarget, DrawCard } from '/imports/server/gameplay/duel-actions.js';

import { getMainGameData } from '/imports/server/global-data/global-data.js';


import { LaunchAsync } from '/imports/helpers/async.js';

Meteor.methods({
    PlayCard: (cardIndex) => {
        PlayCard(Meteor.userId(), cardIndex, getMainGameData());
    },
    Dash: (x, y) => {
        Dash(Meteor.userId(), getMainGameData(), x, y);
    },
    PickTarget: (targetId) => {
        PickTarget(Meteor.userId(), getMainGameData(), targetId);
    },
    PlayShield: () => {
        PlayShield(Meteor.userId(), getMainGameData());
    },
    DrawCards: () => {
        DrawCard(Meteor.userId(), getMainGameData());
    }
})

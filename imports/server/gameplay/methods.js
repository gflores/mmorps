import { PlayCard, PlayShield } from '/imports/server/gameplay/duel-actions.js';
    
Meteor.methods({
    PlayCard: (cardIndex) => {
        PlayCard(Meteor.userId(), cardIndex, getGameData());
    },

    PlayShield: () => {
        PlayShield(Meteor.userId(), getGameData());
    }
})

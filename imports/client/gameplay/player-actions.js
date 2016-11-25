import { setState, setPlayerState, setOpponentState } from '/imports/client/global-data/manage-state.js';

export const decidePlayCard = function(index){
    Meteor.call('PlayCard', index);

    setPlayerState("Action", "ATTACK");
    setPlayerState("ActionCardIndex", index);
}

export const decidePlayShield = function (){
    Meteor.call('PlayShield');
    setPlayerState("Action", "SHIELD");
    setPlayerState("ActionCardIndex", null);
}
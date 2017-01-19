import { setState, } from '/imports/client/global-data/manage-state.js';
import { getState } from '/imports/client/global-data/manage-state.js';

export const decidePlayCard = function(index){
    getState().isSelectDashPositionPhase = true;
    Meteor.call('PlayCard', index);

    
    // setPlayerState("Action", "ATTACK");
    // setPlayerState("ActionCardIndex", index);
    
    // getState().isSelectActionPhase = false;

    console.log("state after play card", getState());
    
}

export const decidePlayShield = function (){
    getState().isSelectDashPositionPhase = false;
    getState().isSelectTargetPhase = false;


    Meteor.call('PlayShield');
    // setPlayerState("Action", "SHIELD");
    // setPlayerState("ActionCardIndex", null);
    

    console.log("state after play shield", getState());
}

export const decidePlayDrawCards = function () {
    getState().isSelectDashPositionPhase = false;
    getState().isSelectTargetPhase = false;

    Meteor.call('DrawCards');
    // setPlayerState("Action", "DRAW");
    // setPlayerState("ActionCardIndex", null);

    
    console.log("state after play draw cards", getState());
}

export const decidePlayDash = function (positionX, positionY) {
    getState().isSelectTargetPhase = true;
    Meteor.call('Dash', positionX, positionY);

    console.log("state after play dash", getState());
}

export const decidePlayerTarget = function (targetId){
    Meteor.call('PickTarget', targetId);

    console.log("state after play target", getState());
}
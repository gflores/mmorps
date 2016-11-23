

export const playCard = function(index){
    Meteor.call('PlayCard', index);
}

export const playShield = function (){
    Meteor.call('PlayShield');
}
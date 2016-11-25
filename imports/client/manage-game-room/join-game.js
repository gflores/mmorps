export const joinMainGame = function() {
    Meteor.call('JoinMainGame');
}

export const resetMainGame = function () {
    Meteor.call('ResetMainGame');
}

export const endMainGame = function () {
    Meteor.call('EndMainGame');
}
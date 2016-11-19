export const joinMainGame = function() {
    Meteor.call('JoinMainGame');
}

export const launchMainGame = function() {
    Meteor.call('LaunchMainGame');
}

export const resetMainGame = function () {
    Meteor.call('ResetMainGame');
    Meteor.call('CleanupMainServerMessage');
}
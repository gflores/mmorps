import { setupReceiveMessages } from '/imports/client/server-messages/setup-receive-messages.js';

export const joinMainGame = function() {
    Meteor.call('JoinMainGame', () => {
        setupReceiveMessages();
    });
}

export const launchMainGame = function() {
    Meteor.call('LaunchMainGame');
}

export const resetMainGame = function () {
    Meteor.call('ResetMainGame');
}
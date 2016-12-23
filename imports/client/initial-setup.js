import "pixi.js/dist/pixi.js";

import { setupInitialReactState } from '/imports/client/global-data/setup-initial-state.js';
import { setupReceiveMessages } from '/imports/client/server-messages/setup-receive-messages.js';
import { setupAutoLogin } from '/imports/client/users/setup-auto-login.js';
import { setupGameUi } from '/imports/client/pixi/setup-game-ui.js';

export const initialSetup = function(){
    setupInitialReactState();
    setupReceiveMessages();
    setupAutoLogin();
    
    setupGameUi();
    Meteor.call('LaunchMainGame');
}
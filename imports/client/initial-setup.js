import { setupInitialState } from '/imports/client/global-data/setup-initial-state.js';
import { setupReceiveMessages } from '/imports/client/server-messages/setup-receive-messages.js';
import { setupAutoLogin } from '/imports/client/users/setup-auto-login.js';

export const initialSetup = function(){
    setupInitialState();
    setupReceiveMessages();
    setupAutoLogin();
}
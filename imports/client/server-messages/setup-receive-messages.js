import { ServerMessages } from '/imports/client/server-messages/server-messages.js';


import { handleServerMessages } from '/imports/client/server-messages/handle-server-messages.js';


export const setupReceiveMessages = function() {
    ServerMessages.find().observeChanges({
        added: (id, message) => {
            handleServerMessages(message);
            console.log("[SERVER MESSAGE] nb: " + ServerMessages.find().count());
        }
    });

    Meteor.subscribe("server-messages");

    console.log("subscribe to 'server-messages'");
}

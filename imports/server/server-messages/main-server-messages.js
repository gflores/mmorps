export const MainServerMessages = new Mongo.Collection(null);


export const sendMainServerMessage = function(message) {
    message.date = new Date();

    console.log("sendServerMessage: ", JSON.stringify(message));
    MainServerMessages.insert(message);
}

export const cleanupMainServerMessages = function() {
    MainServerMessages.remove({});
}

//testing

Meteor.methods({
    "testCleanupMainServerMessage": () => {
        cleanupMainServerMessages();
    },
    "testServerMessage_A": () => {
        sendMainServerMessage({functionId: "test_a", toto: 1})
    },
    "testServerMessage_B": () => {
        sendMainServerMessage({functionId: "test_b", tata: 2})
    },
});
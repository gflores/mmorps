export const MainServerMessages = new Mongo.Collection(null);


export const sendMainServerMessage = (message) => {
    message.date = new Date();

    console.log("sendServerMessage: ", JSON.stringify(message));
    // MainServerMessages.insert(message);
}

export const cleanupMainServerMessages = (message) => {
    // MainServerMessages.remove({});
}
export const MainServerMessages = new Mongo.Collection(null);


export const sendServerMessage = (message) => {
    message.date = new Date();

    console.log("sendServerMessage: ", JSON.stringify(message));
    // MainServerMessages.insert(message);
}

export const cleanupServerMessages = (message) => {
    // MainServerMessages.remove({});
}
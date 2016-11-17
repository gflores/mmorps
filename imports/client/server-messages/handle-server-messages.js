serverMessagesHandlers = {
    "test_a": (message) => {
        console.log("TEST_A !")
    },
    "test_b": (message) => {
        console.log("TEST_B !")
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);

    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
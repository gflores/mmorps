import { setState, setPlayerState, setOpponentState } from '/imports/client/global-data/manage-state.js';

//state:


serverMessagesHandlers = {
    "joined_game": (message) => {
        console.log("joined_game")
    },
    "game_countdown": (message) => {
        console.log("game_countdown")
    },
    "game_started": (message) => {
        console.log("game_started")

        var player = message.players[Meteor.userId()];

        setPlayerState("CurrentHp", player.currentHp);
        setPlayerState("MaxHp", 50);
        setPlayerState("Card[0]", player.currentCards[0]);
        setPlayerState("Card[1]", player.currentCards[1]);
        setPlayerState("Card[2]", player.currentCards[2]);

        setState({
            gameStarted: true
        });
    },
    "new_round": (message) => {
        console.log("new_round")
    },
    "end-of-round": (message) => {
        console.log("end-of-round")
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);

    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
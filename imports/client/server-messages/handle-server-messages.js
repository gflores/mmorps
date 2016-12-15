// import { getState, setState, setPlayerState, setOpponentState } from '/imports/client/global-data/manage-state.js';
import { addPlayerToRoom } from '/imports/client/pixi/players/add-player-to-room.js';

//state:

function setPlayersStates(message) {
    players = message.players;
    for (playerId in players){
        if(playerId == Meteor.userId()){
            // setPlayerState("CurrentHp", players[playerId].currentHp);
            // setPlayerState("MaxHp", players[playerId].maxHp);
            // setPlayerState("Card[0]", players[playerId].currentCards[0]);
            // setPlayerState("Card[1]", players[playerId].currentCards[1]);
            // setPlayerState("Card[2]", players[playerId].currentCards[2]);
            // setPlayerState("CanPlayShield", players[playerId].canPlayShield);
            // console.log("getting game started message");
            // console.log(players);
        } else {
            // setOpponentState("CurrentHp", players[playerId].currentHp);
            // setOpponentState("MaxHp", players[playerId].maxHp);
            // setOpponentState("Card[0]", players[playerId].currentCards[0]);
            // setOpponentState("Card[1]", players[playerId].currentCards[1]);
            // setOpponentState("Card[2]", players[playerId].currentCards[2]);
            // setOpponentState("CanPlayShield", players[playerId].canPlayShield);
        }
    }
}

serverMessagesHandlers = {
    "joined_game": (message) => {
        console.log("joined_game")
        setState({ roomJoined: true });
        console.log(getState());
    },
    "game_countdown": (message) => {
        console.log("game_countdown");
        setState({ 
            roomLaunched: true,
            beforeStartCountdown: message.time
        });
        console.log(getState());
    },
    "game_started": (message) => {
        console.log("game_started");
        setState({ gameStarted: true });
        setPlayersStates(message);
        console.log(getState());
    },
    "new_round": (message) => {
        console.log("new_round");
        setState({
           currentPhase: "DECIDING_PHASE",
            roundTimeLimit: message.timeLimit
        });
        console.log(getState());
    },
    "end-of-round": (message) => {
        console.log("end-of-round");
        setState({
            currentPhase: "RESULT_PHASE"
        });
        // duelAnimation(message);
    },
    "player-positions": (message) => {
        console.log("player-positions");
        console.log(message.players);
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
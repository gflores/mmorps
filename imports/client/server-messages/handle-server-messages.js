import { getState, setState, setPlayerState, setOpponentState } from '/imports/client/global-data/manage-state.js';

//state:

function setPlayersStates(message) {
    players = message.players;
    for (playerId in players){
        if(playerId == Meteor.userId()){
            setPlayerState("CurrentHp", players[playerId].currentHp);
            setPlayerState("MaxHp", players[playerId].maxHp);
            setPlayerState("Card[0]", players[playerId].currentCards[0]);
            setPlayerState("Card[1]", players[playerId].currentCards[1]);
            setPlayerState("Card[2]", players[playerId].currentCards[2]);
            if(message.functionId == "end-of-round"){
                setPlayerState("Action", players[playerId].action);
                setPlayerState("ActionCardIndex", players[playerId].actionCardIndex);
            }
        } else {
            setOpponentState("CurrentHp", players[playerId].currentHp);
            setOpponentState("MaxHp", players[playerId].maxHp);
            setOpponentState("Card[0]", players[playerId].currentCards[0]);
            setOpponentState("Card[1]", players[playerId].currentCards[1]);
            setOpponentState("Card[2]", players[playerId].currentCards[2]);
            if(message.functionId == "end-of-round"){
                setOpponentState("Action", players[playerId].action);
                setOpponentState("ActionCardIndex", players[playerId].actionCardIndex);
            }
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
        setPlayersStates(message);
        console.log(getState());
    }
}

export const handleServerMessages = function(serverMessage){
    console.log("ServerMessageHandler received: ", serverMessage);
    serverMessagesHandlers[serverMessage.functionId](serverMessage)
}
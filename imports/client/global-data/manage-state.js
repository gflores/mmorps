import { getApp } from '/imports/ui/App.jsx';

export const getState = function(){
    return getApp().state;
}

export const setState = function(fields){
    getApp().setState(fields);
}

//

getGamePlayerState = function (playerType) {
    var state = getApp().state;

    return {
        "CurrentHp": state[playerType + "CurrentHp"],
        "MaxHp": state[playerType + "MaxHp"],
        "Card[0]": state[playerType + "Card[0]"],
        "Card[1]": state[playerType + "Card[1]"],
        "Card[2]": state[playerType + "Card[2]"],
        "Action": state[playerType + "Action"],
        "ActionCardIndex": state[playerType + "ActionCardIndex"],
        "CanPlayShield": state[playerType + "CanPlayShield"]
    };
}

export const getPlayerState = function() {
    return getGamePlayerState("player");
}

export const getOpponentState = function() {
    return getGamePlayerState("opponent");
}

//

export const setPlayerState = function(key, value) {
    var newChange = {};

    newChange["player" + key] = value;

    console.log("player setting ", key, " to ", value);

    getApp().setState(newChange);
}

export const setOpponentState = function(key, value) {
    var newChange = {};

    newChange["opponent" + key] = value;

    getApp().setState(newChange);
}

export const isGameFinished = function(){
    var state = getApp().state;

    if (state.playerCurrentHp <= 0 || state.opponentCurrentHp <= 0)
        return true;

    return false;
}

export const isLoser = function(){
    var state = getApp().state;

    if (state.playerCurrentHp <= 0)
        return true;

    return false;
}

export const isWinner = function(){
    var state = getApp().state;

    if (state.opponentCurrentHp <= 0)
        return true;
    
    return false;
}

// debug

window.getState = getState;
window.setState = setState;

window.getPlayerState = getPlayerState;
window.setPlayerState = setPlayerState;

window.getOpponentState = getOpponentState;
window.setOpponentState = setOpponentState;


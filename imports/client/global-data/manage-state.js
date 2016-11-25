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
        "ActionCardIndex": state[playerType + "ActionCardIndex"]
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

    getApp().setState(newChange);
}

export const setOpponentState = function(key, value) {
    var newChange = {};

    newChange["opponent" + key] = value;

    getApp().setState(newChange);
}


// debug

window.getState = getState;
window.setState = setState;

window.getPlayerState = getPlayerState;
window.setPlayerState = setPlayerState;

window.getOpponentState = getOpponentState;
window.setOpponentState = setOpponentState;


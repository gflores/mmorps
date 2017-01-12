import { isCurrentHandEmpty } from '/imports/server/gameplay/players/is-current-hand-empty.js';

import { setDashPosition } from '/imports/server/gameplay/position/dash.js';
import { target } from '/imports/server/gameplay/duels/target.js';


export const PlayCard = (playerId, cardIndex, gameData) => {
    // if player exist, cardIndex's card exist, and can play cards (canDuelAction)
    if(isCurrentHandEmpty(gameData.players[playerId]) == false && gameData.players[playerId].currentCards[cardIndex] != null && gameData.canDuelAction == true ){
        gameData.players[playerId].action = 'ATTACK';
        gameData.players[playerId].actionCardIndex = cardIndex;
    } else {
        console.log(playerId, " Cannot Play Card");
    }
}

export const Dash = (playerId, gameData, x, y) => {
    if(gameData.players[playerId].action == 'ATTACK'){
        console.log("setting dash position");
        setDashPosition(gameData.players[playerId], x, y);
    } else {
        console.log(playerId, "Cannot Dash");
    }

}

export const PickTarget = (playerId, gameData, targetId) => {
    if(gameData.players[playerId].action == 'ATTACK') {
        target(gameData.players[playerId], targetId);
    } else {
        console.log(playerId, "Cannot Pick Target");
    }
}

export const PlayShield = (playerId, gameData) => {
    if(gameData.players[playerId].canPlayShield && gameData.canDuelAction == true){
        gameData.players[playerId].action = 'SHIELD';
        console.log("playing shield");
    } else {
        console.log(playerId, " Cannot Play Shield");
    }

}

export const DrawCard = (playerId, gameData) => {
    if (gameData.canDuelAction == true){
        gameData.players[playerId].action = 'DRAW';
        console.log("Drawing new set of cards");
    } else {
        console.log(playerId, " Cannot Draw");
    }
}

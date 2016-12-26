import { isCurrentHandEmpty } from '/imports/server/gameplay/players/is-current-hand-empty.js';

import { setDashPosition } from '/imports/server/gameplay/position/dash.js';
import { target } from '/imports/server/gameplay/duels/target.js';


export const PlayCard = (playerId, cardIndex, gameData, x, y, targetId) => {
    // if player exist, cardIndex's card exist, and can play cards (canDuelAction)
    if(isCurrentHandEmpty(gameData.players[playerId]) == false && gameData.players[playerId].currentCards[cardIndex] != null && gameData.canDuelAction == true ){
        gameData.players[playerId].action = 'ATTACK';
        gameData.players[playerId].actionCardIndex = cardIndex;
        setDashPosition(gameData.players[playerId], x, y);
        target(gameData.players[playerId], targetId);
        console.log("after card played status update", gameData.players[playerId]);
    } else {
        console.log(playerId, " Cannot Play Card");
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

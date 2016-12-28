import { computeActionHpCosts } from '/imports/server/gameplay/compute-round-results/compute-action-hp-costs.js';
import { computeDuelResult } from '/imports/server/gameplay/compute-round-results/compute-duel-results.js';
import { computePlayerCardsAndDeck } from '/imports/server/gameplay/compute-round-results/compute-player-cards-and-deck.js';

import { getMainGameData } from '/imports/server/global-data/global-data';

export const computeRoundResults = function(gameData) {
    console.log("computing round result");
    var attacker = null;
    var targetedPlayer = null;
    var player = null;
    for ( playerId in gameData.players ){
        attacker = gameData.players[playerId];
        targetedPlayer = gameData.players[attacker.targetPlayerId];
        console.log("before: attacker", attacker);
        console.log("before: targetedPlayer", targetedPlayer);
        if (targetedPlayer && targetedPlayer != attacker){
            computeDuelResult(attacker, targetedPlayer);
        }
        console.log("after: attacker", attacker);
        console.log("after: targetedPlayer", targetedPlayer);
    }

    for ( playerId in gameData.players ){
        player = gameData.players[playerId];
        computeActionHpCosts(player);
        computePlayerCardsAndDeck(player);
        console.log("end of round for ", playerId, player);
    }
    
};
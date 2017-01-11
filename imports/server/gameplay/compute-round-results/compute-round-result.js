import { computeActionHpCosts } from '/imports/server/gameplay/compute-round-results/compute-action-hp-costs.js';
import { computeDuelResult } from '/imports/server/gameplay/compute-round-results/compute-duel-results.js';
import { computePlayerCardsAndDeck } from '/imports/server/gameplay/compute-round-results/compute-player-cards-and-deck.js';

import { getMainGameData } from '/imports/server/global-data/global-data';

export const computeRoundResults = function(gameData) {
    console.log("computing round result");
    var attacker = null;
    var targetedPlayer = null;
    var player = null;
    // updateAllPlayerDistanceFromTarget( gameData.players );
    //
    // var battleArray = sortBattleOrder( gameData.players );

    // for ( index in battleArray ){
    //     attacker = battleArray[index];
    //     targetedPlayer = gameData.players[attacker.targetPlayerId];
    //     console.log("before: attacker", attacker);
    //     console.log("before: targetedPlayer", targetedPlayer);
    //     if (targetedPlayer && targetedPlayer != attacker){
    //         computeDuelResult(attacker, targetedPlayer);
    //     }
    //     console.log("after: attacker", attacker);
    //     console.log("after: targetedPlayer", targetedPlayer);
    // }

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

function updateAllPlayerDistanceFromTarget( players ){
    for ( playerId in players ){
        updateDistanceFromTarget(players[playerId], players);
    }
}

function updateDistanceFromTarget( player, players) {
    var currentPosition = player.position;
    // var enemyPosition = players[player.targetPlayerId].position;
    console.log("update distance from target", players[player.targetPlayerId]);
    player.distanceFromTargetPlayer = 6;
}

function sortBattleOrder( players ){

    var battleArray = [];

    for (playerId in players){
        battleArray.push(players[playerId]);
    }

    battleArray.sort((playerA, playerB)=> {
        return playerA.distanceFromTargetPlayer - playerB.distanceFromTargetPlayer;
    });

    return battleArray;
}
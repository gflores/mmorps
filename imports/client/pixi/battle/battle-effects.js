import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { constructMoveToCoroutine } from '/imports/client/pixi/screen/position-helper.js';
import { convertAbsoluteToRelativePlayerPosition, convertToScreenValues } from "/imports/client/pixi/screen/convert-position.js";

var state = getState();

export const setupBattleEffects = function(){
    state.attackProjectileContainer = new PIXI.Container();

    state.attackProjectile = new PIXI.Graphics();

    state.attackProjectileContainer.addChild(state.attackProjectile);

    state.gameMap.addChild(state.attackProjectileContainer);


    // state.attackProjectile.beginFill(0xFF0000);
    // state.attackProjectile.drawCircle(0, 0, 15);
    // state.attackProjectile.endFill();
}

getDashCoroutine = function(statePlayer, playerAction){
    var initialPosition = {
        x: statePlayer.position.x,
        y: statePlayer.position.y
    };

    var finalPosition = {
        x: playerAction.lastPosition.x,
        y: playerAction.lastPosition.y
    };

    var dashDistance = Math.sqrt(Math.pow(finalPosition.x - initialPosition.x, 2) + Math.pow(finalPosition.y - initialPosition.y, 2));

    var playerMoveCoroutine = constructMoveToCoroutine(statePlayer.position, initialPosition, finalPosition, dashDistance / 40);

    return playerMoveCoroutine;
}

getProjectileCoroutine = function(message, statePlayer, playerAction){

        var projectileCoroutine = constructCoroutine(() => {
            var targetPlayer = getPlayer(playerAction.targetPlayerId);
            var playedCard = statePlayer.currentCards[playerAction.actionCardIndex];
            var resultingTargetPlayer = message.players[playerAction.targetPlayerId];


            if (playedCard.element == "ROCK")
                state.attackProjectile.beginFill(0x512d00);
            else if (playedCard.element == "PAPER")
                state.attackProjectile.beginFill(0x8bc34a);
            else
                state.attackProjectile.beginFill(0xFF0000);

            state.attackProjectile.drawCircle(0, 0, 22);
            state.attackProjectile.endFill();


            statePlayer.currentHp -= 1;
            // statePlayer.currentCards = playerAction.currentCards;
            // if (statePlayer.currentCards.length == 1 || statePlayer.currentCards.length == 2)
            //     statePlayer.currentHp -= 1;
            // else
            //     statePlayer.currentHp += 2;

            var initialPosition = {
                x: statePlayer.position.x,
                y: statePlayer.position.y
            };

            var finalPosition = {
                x: targetPlayer.position.x,
                y: targetPlayer.position.y
            };


            var projectileDistance = Math.sqrt(Math.pow(finalPosition.x - initialPosition.x, 2) + Math.pow(finalPosition.y - initialPosition.y, 2));


            convertAbsoluteToRelativePlayerPosition(initialPosition);
            convertToScreenValues(initialPosition);

            convertAbsoluteToRelativePlayerPosition(finalPosition);
            convertToScreenValues(finalPosition);



            var projectileMoveCoroutine = constructMoveToCoroutine(state.attackProjectileContainer, initialPosition, finalPosition, projectileDistance / 60);

            chainCoroutines(
                projectileMoveCoroutine,
                [
                    constructCoroutine(() => {
                            state.attackProjectile.clear();
                            targetPlayer.currentHp = resultingTargetPlayer.currentHp;
                        }, () => false
                    ),
                    constructShakeObjectCoroutine(targetPlayer.mainSprite, 10, 0.3)

                ]
            );

            addCoroutine(projectileMoveCoroutine);
        }, () => false);

        return projectileCoroutine;
}

export const playerDoBattleEffect = function(message, playerAction){
    var statePlayer = getPlayer(playerAction.id);
    
    if (playerAction.action == "ATTACK"){

        var dashCoroutine = getDashCoroutine(statePlayer, playerAction);
        if (playerAction.targetPlayerId != null){
            var projectileCoroutine = getProjectileCoroutine(message, statePlayer, playerAction);
            chainCoroutines(dashCoroutine,
                [
                    projectileCoroutine
                ]
            );            
        }
        addCoroutine(dashCoroutine);
    }
}


window.playerDoBattleEffect = playerDoBattleEffect;
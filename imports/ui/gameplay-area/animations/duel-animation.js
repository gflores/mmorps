import { playerShowSelectedAction, playerAreaMinimized, playerSelectedActionMoveCenter,
         playerActionDoMove, opponentHealthbarShake, playerActionDoBack,
         playerActionContainerDisappear, playerAreaMaximized, playerActionCardAreaMinimized,
         playerActionCardAreaMaximized } from '/imports/ui/gameplay-area/animations/player-animations.js';
import { opponentShowSelectedAction, opponentAreaMinimized, opponentSelectedActionMoveCenter,
         opponentActionDoMove, playerHealthbarShake, opponentActionDoBack,
         opponentActionContainerDisappear, opponentAreaMaximized, opponentActionCardAreaMinimized,
         opponentActionCardAreaMaximized } from '/imports/ui/gameplay-area/animations/opponent-animations.js';

import { executeHealNumberFeedbackForOpponent, executeHealNumberFeedbackForPlayer, executeDamageNumberFeedbackForOpponent, executeDamageNumberFeedbackForPlayer
    } from '/imports/client/animations/damage-number-feedback.js';

export const duelAnimation = (message) => {
    var timeline = new TimelineLite();
    var playerId, opponentId;
    var playerAction;
    var opponentAction;
    
    players = message.players;
    for (playerIdentification in players){
        if(playerIdentification == Meteor.userId()){
            playerId = playerIdentification;
        } else {
            opponentId = playerIdentification;
        }
    }
    
    setOpponentState("Action", players[opponentId].action);
    setOpponentState("ActionCardIndex", players[opponentId].actionCardIndex);
    
    if (getPlayerState().Action == 'ATTACK') {
        playerAction = 'ATTACK';
    } else if (getPlayerState().Action == 'SHIELD'){
        playerAction = 'SHIELD';
    }
    
    if (getOpponentState().Action == 'ATTACK'){
        opponentAction = 'ATTACK';
    } else if (getOpponentState().Action == 'SHIELD'){
        opponentAction = 'SHIELD';
    }
    
    console.log("player action", playerAction);
    console.log("opponent action", opponentAction);
    
    timeline.addLabel(
        "reveal cards"
    ).add(
        playerShowSelectedAction(playerAction),
        "reveal cards"
    ).add(
        opponentShowSelectedAction(opponentAction),
        "reveal cards"
    ).addLabel(
        "minimize hands"
    ).add(
        playerAreaMinimized(),
        "minimize hands"
    ).add(
        opponentAreaMinimized(),
        "minimize hands"
    ).add(
        playerActionCardAreaMinimized(),
        "minimize hands"
    ).add(
        opponentActionCardAreaMinimized(),
        "minimize hands"
    ).addLabel(
        "card to center"
    ).add(
        playerSelectedActionMoveCenter(playerAction),
        "card to center"
    ).add(
        opponentSelectedActionMoveCenter(opponentAction),
        "card to center"
    ).add(
        playerActionDoMove(playerAction).add( () => {
            var newLife = players[opponentId].currentHp;
            var lifeDifference = newLife - getOpponentState().CurrentHp

            if (lifeDifference > 0)
                executeHealNumberFeedbackForOpponent(lifeDifference);
            else
                executeDamageNumberFeedbackForOpponent(-lifeDifference);

            setOpponentState("CurrentHp", newLife);
        })
    ).add(
        opponentHealthbarShake(playerAction)
    ).add(
        playerActionDoBack(playerAction)
    ).add(
        opponentActionDoMove(opponentAction).add ( () => {

            var newLife = players[playerId].currentHp;
            var lifeDifference = newLife - getPlayerState().CurrentHp

            if (lifeDifference > 0)
                executeHealNumberFeedbackForPlayer(lifeDifference);
            else
                executeDamageNumberFeedbackForPlayer(-lifeDifference);



            setPlayerState("CurrentHp", newLife);
        })
    ).add(
        playerHealthbarShake(opponentAction)
    ).add(
        opponentActionDoBack(opponentAction)
    ).addLabel(
        "card disappear"
    ).add(
        playerActionContainerDisappear(playerAction).add ( () => {
            setPlayerState("Card[0]", players[playerId].currentCards[0]);
            setPlayerState("Card[1]", players[playerId].currentCards[1]);
            setPlayerState("Card[2]", players[playerId].currentCards[2]);
        }),
        "card disappear"
    ).add(
        opponentActionContainerDisappear(opponentAction).add ( () => {
            setOpponentState("Card[0]", players[opponentId].currentCards[0]);
            setOpponentState("Card[1]", players[opponentId].currentCards[1]);
            setOpponentState("Card[2]", players[opponentId].currentCards[2]);
        }),
        "card disappear"
    ).addLabel(
        "maximize hand"
    ).add(
        playerActionCardAreaMaximized(),
        "maximize hand"
    ).add(
        opponentActionCardAreaMaximized(),
        "maximize hand"
    ).add(
        playerAreaMaximized(),
        "maximize hand"
    ).add(
        opponentAreaMaximized(),
        "maximize hand"
    ).add( () => {
        setPlayerState("Action", null);
        setPlayerState("ActionCardIndex", null);
        setOpponentState("Action", null);
        setOpponentState("ActionCardIndex", null);
    });

    timeline.play();
};
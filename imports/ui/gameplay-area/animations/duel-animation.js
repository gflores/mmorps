import { playerShowSelectedAction, playerAreaMinimized, playerSelectedActionMoveCenter,
         playerActionDoMove, opponentHealthbarShake, playerActionDoBack,
         playerActionContainerDisappear, playerAreaMaximized, playerActionCardAreaMinimized,
         playerActionCardAreaMaximized } from '/imports/ui/gameplay-area/animations/player-animations.js';
import { opponentShowSelectedAction, opponentAreaMinimized, opponentSelectedActionMoveCenter,
         opponentActionDoMove, playerHealthbarShake, opponentActionDoBack,
         opponentActionContainerDisappear, opponentAreaMaximized, opponentActionCardAreaMinimized,
         opponentActionCardAreaMaximized } from '/imports/ui/gameplay-area/animations/opponent-animations.js';

import { getActionSelectedTimeDelay, getActionDoMoveTimeDelay } from '/imports/shared/global-variables.js';

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
    
    console.log("in duel animation");
    console.log(players[playerId]);
    console.log(players[opponentId]);
    
    setOpponentState("Action", players[opponentId].action);
    setOpponentState("ActionCardIndex", players[opponentId].actionCardIndex);

    setPlayerState("Action", players[playerId].action);
    setPlayerState("ActionCardIndex", players[playerId].actionCardIndex);
    
    var opponentNewLife = players[opponentId].currentHp;
    var opponentLifeDifference = opponentNewLife - getOpponentState().CurrentHp;

    var playerNewLife = players[playerId].currentHp;
    var playerLifeDifference = playerNewLife - getPlayerState().CurrentHp;


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
        "minimize hands", "+=" + getActionSelectedTimeDelay()
    ).add(
        playerAreaMinimized(),
        "minimize hands"
    ).add(
        opponentAreaMinimized(),
        "minimize hands"
    ).add(
        playerActionCardAreaMinimized(playerAction, playerLifeDifference, playerNewLife),
        "minimize hands"
    ).add(
        opponentActionCardAreaMinimized(opponentAction, opponentLifeDifference, opponentNewLife),
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
        playerActionDoMove(playerAction, opponentAction, opponentLifeDifference, opponentNewLife, playerLifeDifference, playerNewLife),
        "+=" + getActionDoMoveTimeDelay()
    ).add(
        opponentHealthbarShake(playerAction)
    ).add(
        playerActionDoBack(playerAction)
    ).add(
        opponentActionDoMove(opponentAction, playerAction, playerLifeDifference, playerNewLife, opponentLifeDifference, opponentNewLife),
        "+=" + getActionDoMoveTimeDelay()
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
        setPlayerState("CanPlayShield", players[playerId].canPlayShield);
        setOpponentState("CanPlayShield", players[opponentId].canPlayShield);
        setPlayerState("CurrentHp", players[playerId].currentHp);
        setOpponentState("CurrentHp", players[opponentId].currentHp);
    });

    
    
    timeline.play();

    console.log("end duel animation");
    console.log(players);
};
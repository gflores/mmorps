import { playerShowSelectedAction, playerAreaMinimized, playerSelectedActionMoveCenter,
         playerActionDoMove, opponentHealthbarShake, playerActionDoBack,
         playerAreaMaximized } from '/imports/ui/gameplay-area/animations/player-animations.js';
import { opponentShowSelectedAction, opponentAreaMinimized, opponentSelectedActionMoveCenter,
         opponentActionDoMove, playerHealthbarShake, opponentActionDoBack,
         opponentAreaMaximized } from '/imports/ui/gameplay-area/animations/opponent-animations.js';

export const duelAnimation = (message) => {
    var timeline = new TimelineLite();
    var playerId, opponentId;
    var playerCardPlayed = false;
    var opponentCardPlayed = false;
    
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
        playerCardPlayed = true;
    }
    
    if (getOpponentState().Action == 'ATTACK'){
        opponentCardPlayed = true;
    }
    
    timeline.add(
        playerShowSelectedAction(playerCardPlayed)
    ).add(
        opponentShowSelectedAction(opponentCardPlayed)
    ).add(
        playerAreaMinimized()
    ).add(
        opponentAreaMinimized()
    ).add(
        playerSelectedActionMoveCenter(playerCardPlayed)
    ).add(
        opponentSelectedActionMoveCenter(opponentCardPlayed)
    ).add(
        playerActionDoMove(playerCardPlayed).add( () => {
            setOpponentState("CurrentHp", players[opponentId].currentHp);
        })
    ).add(
        opponentHealthbarShake(playerCardPlayed)
    ).add(
        playerActionDoBack(playerCardPlayed).add ( () => {
            setPlayerState("Card[0]", players[playerId].currentCards[0]);
            setPlayerState("Card[1]", players[playerId].currentCards[1]);
            setPlayerState("Card[2]", players[playerId].currentCards[2]);
        })
    ).add(
        opponentActionDoMove(opponentCardPlayed).add ( () => {
            setPlayerState("CurrentHp", players[playerId].currentHp)
        })
    ).add(
        playerHealthbarShake(opponentCardPlayed)
    ).add(
        opponentActionDoBack(opponentCardPlayed).add ( () => {
            setOpponentState("Card[0]", players[opponentId].currentCards[0]);
            setOpponentState("Card[1]", players[opponentId].currentCards[1]);
            setOpponentState("Card[2]", players[opponentId].currentCards[2]);
        })
    ).add(
        playerAreaMaximized()
    ).add(
        opponentAreaMaximized()
    ).add( () => {
        setPlayerState("Action", null);
        setPlayerState("ActionCardIndex", null);
        setOpponentState("Action", null);
        setOpponentState("ActionCardIndex", null);
    });

    timeline.play();
};
import gsap from 'gsap';

import { getState, getPlayerState} from '/imports/client/global-data/manage-state.js';

export const playerAreaMinimized = () => {
    var playerHand = new TimelineLite();

    playerHand.to(".player-side .player-controler", 1, {
        opacity: .5,
        top: 130,
        position: 'relative'
    });

    console.log("player hand");
    console.log(playerHand);
    return playerHand;
};

export const playerAreaMaximized = () => {
    var playerHand = new TimelineLite();

    playerHand.to(".player-side .player-controler", 1, {
        opacity: 1,
        top: 0,
        position: 'relative',
        onComplete: () => {
            TweenMax.set($(".player-side .player-controler"), {clearProps: "all"});
        }
    });

    return playerHand;
};

export const playerShowSelectedAction = (cardPlayed) => {
    var timeline = new TimelineLite();
    
    if (cardPlayed){
        var fakeCardPosition = $('.player-side .action-card-container .game-card').position();
        var actionCardAtHandPosition = $('.player-side .player-controler .playable-cards ' +
            '.playable-game-card:nth-child(' + (getPlayerState("player").ActionCardIndex+1) +') .game-card').position();
        
        timeline.to('.player-side .action-card-container .game-card', .01, {
            top: actionCardAtHandPosition.top - fakeCardPosition.top,
            left: actionCardAtHandPosition.left - fakeCardPosition.left,
            zIndex: 10
        }).to('.player-side .action-card-container .game-card', 1, {
            autoAlpha: 1,
            scale: 1.3
        });    
    }
    
    
    return timeline;
};

export const playerSelectedActionMoveCenter = (cardPlayed) => {
    var timeline = new TimelineLite();
    
    if(cardPlayed){
        timeline.to('.player-side .action-card-container .game-card', 1, {
            scale: 1,
            top: 0,
            left: 0
        });    
    }
    
    
    return timeline;
};

export const playerActionDoMove = (cardPlayed) => {
  var timeline = new TimelineLite();
    
    if(cardPlayed){
        timeline.to('.player-side .action-card-container .game-card', .1, {
            top: -150,
            autoAlpha: 0
        });    
    }
    
    return timeline;
};

export const opponentHealthbarShake = (cardPlayed) => {
    var timeline = new TimelineLite();
    
    if(cardPlayed){
        timeline.to('.opponent-side .healthbar-container .healthbar', .05, {
            x: "+=20",
            yoyo: true,
            repeat: 5
        });    
    }
    
    return timeline;
};

export const playerActionDoBack = (cardPlayed) => {
    var timeline = new TimelineLite();
    if(cardPlayed){
        timeline.to('.player-side .action-card-container .game-card', .5, {
            autoAlpha: 1
        }).to('.player-side .action-card-container .game-card', 1, {
            top: 0,
            autoAlpha: 0
        });    
    }
    return timeline;
};

export const playerActionCardAnimate = () => {
    var timeline = new TimelineLite();
    timeline.add(
      playerShowSelectedAction()  
    ).add(
       playerAreaMinimized()
    ).add(
       playerSelectedActionMoveCenter() 
    ).add(
        playerActionDoMove()
    ).add(
        opponentHealthbarShake()
    ).add(
        playerActionDoBack()
    ).add(
        playerAreaMaximized()
    );
    timeline.play();
};
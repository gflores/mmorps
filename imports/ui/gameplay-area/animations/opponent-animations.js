import gsap from 'gsap';

import { getState, getPlayerState} from '/imports/client/global-data/manage-state.js';

export const opponentAreaMinimized = () => {
    var opponentHand = new TimelineLite();

    opponentHand.to(".opponent-side .player-controler", 1, {
        opacity: .5,
        top: -130,
        position: 'relative'
    });

    console.log("opponent hand");
    console.log(opponentHand);
    return opponentHand;
};

export const opponentAreaMaximized = () => {
    var opponentHand = new TimelineLite();

    opponentHand.to(".opponent-side .player-controler", 1, {
        opacity: 1,
        top: 0,
        position: 'relative',
        onComplete: () => {
            TweenMax.set($(".opponent-side .player-controler"), {clearProps: "all"});
        }
    });

    return opponentHand;
};

export const opponentShowSelectedAction = (cardPlayed) => {
    var timeline = new TimelineLite();
    if(cardPlayed){
        var fakeCardPosition = $('.opponent-side .action-card-container .game-card').position();
        var actionCardAtHandPosition = $('.player-controler .playable-cards ' +
            '.playable-game-card:nth-child(' + (getPlayerState("opponent").ActionCardIndex+1) +') .game-card').position();
        
        timeline.to('.opponent-side .action-card-container .game-card', .01, {
            top: actionCardAtHandPosition.top - fakeCardPosition.top,
            left: actionCardAtHandPosition.left - fakeCardPosition.left,
            zIndex: 10
        }).to('.opponent-side .action-card-container .game-card', 1, {
            autoAlpha: 1,
            scale: 1.3
        });    
    }
    return timeline;
};

export const opponentSelectedActionMoveCenter = (cardPlayed) => {
    var timeline = new TimelineLite();

    if(cardPlayed){
        timeline.to('.opponent-side .action-card-container .game-card', 1, {
            scale: 1,
            top: 0,
            left: 0
        });
    }
    
    return timeline;
};

export const opponentActionDoMove = (cardPlayed) => {
    var timeline = new TimelineLite();

    if(cardPlayed){
        timeline.to('.opponent-side .action-card-container .game-card', .1, {
            top: 150,
            autoAlpha: 0
        });
    }
    
    return timeline;
};

export const playerHealthbarShake = (cardPlayed) => {
    var timeline = new TimelineLite();
    if(cardPlayed){
        timeline.to('.player-side .healthbar-container .healthbar', .05, {
            x: "+=20",
            yoyo: true,
            repeat: 5
        });
    }
    return timeline;
};

export const opponentActionDoBack = (cardPlayed) => {
    var timeline = new TimelineLite();
    if(cardPlayed){
        timeline.to('.opponent-side .action-card-container .game-card', .5, {
            autoAlpha: 1
        }).to('.opponent-side .action-card-container .game-card', 1, {
            top: 0,
            autoAlpha: 0
        });    
    }
    return timeline;
};

export const opponentActionCardAnimate = () => {
    var timeline = new TimelineLite();

    timeline.add(
        opponentShowSelectedAction()
    ).add(
        opponentAreaMinimized()
    ).add(
        opponentSelectedActionMoveCenter()
    ).add(
        opponentActionDoMove()
    ).add(
        playerHealthbarShake()
    ).add(
        opponentActionDoBack()
    ).add(
        opponentAreaMaximized()
    );
    timeline.play();
};
import gsap from 'gsap';

import { getState, getOpponentState} from '/imports/client/global-data/manage-state.js';

export const opponentAreaMinimized = () => {
    var opponentHand = new TimelineLite();

    opponentHand.to(".opponent-side .player-controler", 1, {
        opacity: .5,
        top: -180,
        position: 'relative'
    });

    console.log("opponent hand");
    console.log(opponentHand);
    return opponentHand;
};

export const opponentActionCardAreaMinimized = () => {
    var timeline = new TimelineLite();
    timeline.to(".opponent-side .action-card-container", 1, {
        y: '-=' + 180,
        position: 'relative'
    });
    return timeline;
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


export const opponentActionCardAreaMaximized = () => {
    var timeline = new TimelineLite();
    timeline.to(".opponent-side .action-card-container", 1, {
        y: '+=' + 180,
        position: 'relative',
        onComplete: () => {
            TweenMax.set($(".opponent-side .action-card-container"), {clearProps: "all"});
        }
    });
    return timeline;
};

const opponentShowSelectedShield = () => {
    var timeline = new TimelineLite();

    var fakeCardPosition = $('.opponent-side .action-card-container .mirror-shield-action').position();
    var actionCardAtHandPosition = $('.opponent-side .player-controler .mirror-shield-action').position();

    timeline.to('.opponent .action-card-container .mirror-shield-action', .01, {
        y: actionCardAtHandPosition.top - fakeCardPosition.top,
        x: actionCardAtHandPosition.left - fakeCardPosition.left,
        zIndex: 10
    }).to('.opponent .action-card-container .mirror-shield-action', 1, {
        autoAlpha: 1,
        scale: 1.3
    });
    return timeline;
};

const opponentShowSelectedCard = () => {
    var timeline = new TimelineLite();
    
    var fakeCardPosition = $('.opponent-side .action-card-container .game-card').position();
    var actionCardAtHandPosition = $('.opponent-side .player-controler .playable-cards ' +
        '.playable-game-card:nth-child(' + (getOpponentState().ActionCardIndex+1) +') .game-card').position();

    timeline.to('.opponent-side .action-card-container .game-card', .01, {
        y: actionCardAtHandPosition.top - fakeCardPosition.top,
        x: actionCardAtHandPosition.left - fakeCardPosition.left,
        zIndex: 10
    }).to('.opponent-side .action-card-container .game-card', 1, {
        autoAlpha: 1,
        scale: 1.3
    });
    
    return timeline;
};

export const opponentShowSelectedAction = (opponentAction) => {
    if(opponentAction == 'ATTACK'){
        return opponentShowSelectedCard();
    } else if (opponentAction == 'SHIELD'){
        return opponentShowSelectedShield();
    } else {
        return new TimelineLite();
    }
};

export const opponentSelectedShieldMoveCenter = () => {
    var timeline = new TimelineLite();
    var fakeCardPosition = $('.opponent-side .action-card-container .mirror-shield-action').position();
    var actionCardAtHandPosition = $('.opponent-side .player-controler .mirror-shield-action').position();
    timeline.to('.opponent-side .action-card-container .mirror-shield-action', 1, {
        scale: 1,
        y: '+=' + (fakeCardPosition.top - actionCardAtHandPosition.top),
        x: '+=' + (fakeCardPosition.left - actionCardAtHandPosition.left)
    });
    return timeline;
};

const opponentSelectedCardMoveCenter = () => {
    var timeline = new TimelineLite();
    var fakeCardPosition = $('.opponent-side .action-card-container .game-card').position();
    var actionCardAtHandPosition = $('.opponent-side .player-controler .playable-cards ' +
        '.playable-game-card:nth-child(' + (getOpponentState().ActionCardIndex+1) +') .game-card').position();
    timeline.to('.opponent-side .action-card-container .game-card', 1, {
        scale: 1,
        y: '+=' + (fakeCardPosition.top - actionCardAtHandPosition.top),
        x: '+=' + (fakeCardPosition.left - actionCardAtHandPosition.left)
    });

    return timeline;
};

export const opponentSelectedActionMoveCenter = (opponentAction) => {
    if(opponentAction == 'ATTACK'){
        return opponentSelectedCardMoveCenter();
    } else if (opponentAction == 'SHIELD'){
        return opponentSelectedShieldMoveCenter();
    } else {
        return new TimelineLite();
    }
    
};

const opponentCardDoMove = () => {
    var timeline = new TimelineLite();
    timeline.to('.opponent-side .action-card-container .game-card', .1, {
        y: '+=' + 150,
        autoAlpha: 0
    });
    return timeline;
};

export const opponentActionDoMove = (opponentAction) => {
    if(opponentAction == 'ATTACK'){
        return opponentCardDoMove();
    } else {
        return new TimelineLite();
    }
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

const opponentCardDoBack = () => {
    var timeline = new TimelineLite();

    timeline.to('.opponent-side .action-card-container .game-card', .5, {
        autoAlpha: 1
    }).to('.opponent-side .action-card-container .game-card', 1, {
        y: '-=' + 150
    });

    return timeline;
};

export const opponentActionDoBack = (opponentAction) => {
    if(opponentAction == 'ATTACK'){
        return opponentCardDoBack();
    } else {
        return new TimelineLite();
    }
};

const opponentShieldDisappear = () => {
    var timeline = new TimelineLite();
    timeline.to('.opponent-side .action-card-container .mirror-shield-action', 1, {
        autoAlpha: 0
    });
    return timeline;
};

const opponentActionCardDisappear = () => {
    var timeline = new TimelineLite();
    timeline.to('.opponent-side .action-card-container .game-card', 1, {
        autoAlpha: 0
    });
    return timeline;
};

export const opponentActionContainerDisappear = (opponentAction) => {
    if(opponentAction == 'ATTACK'){
        return opponentActionCardDisappear();
    } else if (opponentAction == 'SHIELD'){
        return opponentShieldDisappear();
    } else {
        return new TimelineLite();
    }
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
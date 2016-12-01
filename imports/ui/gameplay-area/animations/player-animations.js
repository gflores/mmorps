import gsap from 'gsap';

import { getState, getPlayerState} from '/imports/client/global-data/manage-state.js';

export const playerAreaMinimized = () => {
    var playerHand = new TimelineLite();

    playerHand.to(".player-side .player-controler", 1, {
        opacity: .5,
        top: 180,
        position: 'relative'
    });

    console.log("player hand");
    console.log(playerHand);
    return playerHand;
};

export const playerActionCardAreaMinimized = () => {
    var timeline = new TimelineLite();
    timeline.to(".player-side .action-card-container", 1, {
        y: '+=' + 180,
        position: 'relative'
    });
    return timeline;
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

export const playerActionCardAreaMaximized = () => {
    var timeline = new TimelineLite();
    timeline.to(".player-side .action-card-container", 1, {
        y: '-=' + 180,
        position: 'relative',
        onComplete: () => {
            TweenMax.set($(".player-side .action-card-container"), {clearProps: "all"});
        }
    });
    return timeline;
};

const playerShowSelectedShield = () => {
  var timeline = new TimelineLite();

    var fakeCardPosition = $('.player-side .action-card-container .mirror-shield-action').position();
    var actionCardAtHandPosition = $('.player-side .player-controler .mirror-shield-action').position();

    timeline.to('.player-side .action-card-container .mirror-shield-action', .01, {
        y: actionCardAtHandPosition.top - fakeCardPosition.top,
        x: actionCardAtHandPosition.left - fakeCardPosition.left,
        zIndex: 10
    }).to('.player-side .action-card-container .mirror-shield-action', 1, {
        autoAlpha: 1,
        scale: 1.3
    });
    return timeline;
};

const playerShowSelectedCard = () => {
    var timeline = new TimelineLite();
    
    var fakeCardPosition = $('.player-side .action-card-container .game-card').position();
    var actionCardAtHandPosition = $('.player-side .player-controler .playable-cards ' +
        '.playable-game-card:nth-child(' + (getPlayerState("player").ActionCardIndex+1) +') .game-card').position();

    timeline.to('.player-side .action-card-container .game-card', .01, {
        y: actionCardAtHandPosition.top - fakeCardPosition.top,
        x: actionCardAtHandPosition.left - fakeCardPosition.left,
        zIndex: 10
    }).to('.player-side .action-card-container .game-card', 1, {
        autoAlpha: 1,
        scale: 1.3
    });

    return timeline;
};

export const playerShowSelectedAction = (playerAction) => {
  if(playerAction == 'ATTACK'){
      return playerShowSelectedCard();
  } else if (playerAction == 'SHIELD'){
      return playerShowSelectedShield();
  } else {
      return new TimelineLite();
  }
};

const playerSelectedShieldMoveCenter = () => {
    var timeline = new TimelineLite();
    var fakeCardPosition = $('.player-side .action-card-container .mirror-shield-action').position();
    var actionCardAtHandPosition = $('.player-side .player-controler .mirror-shield-action').position();
    timeline.to('.player-side .action-card-container .mirror-shield-action', 1, {
        scale: 1,
        y: '+=' + (fakeCardPosition.top - actionCardAtHandPosition.top),
        x: '+=' + (fakeCardPosition.left - actionCardAtHandPosition.left)
    });
    return timeline;
};

const playerSelectedCardMoveCenter = () => {
    var timeline = new TimelineLite();
    var fakeCardPosition = $('.player-side .action-card-container .game-card').position();
    var actionCardAtHandPosition = $('.player-side .player-controler .playable-cards ' +
        '.playable-game-card:nth-child(' + (getPlayerState().ActionCardIndex+1) +') .game-card').position();
    timeline.to('.player-side .action-card-container .game-card', 1, {
        scale: 1,
        y: '+=' + (fakeCardPosition.top - actionCardAtHandPosition.top),
        x: '+=' + (fakeCardPosition.left - actionCardAtHandPosition.left)
    });
    return timeline;
};

export const playerSelectedActionMoveCenter = (playerAction) => {
  if(playerAction == 'ATTACK'){
      return playerSelectedCardMoveCenter();
  } else if (playerAction == 'SHIELD'){
      return playerSelectedShieldMoveCenter();
  } else {
      return new TimelineLite();
  }
};

const playerCardDoMove = () => {
    var timeline = new TimelineLite();
    
    timeline.to('.player-side .action-card-container .game-card', .1, {
        y: '-=' + 150,
        autoAlpha: 0
    });

    return timeline;  
};

export const playerActionDoMove = (playerAction) => {
  if(playerAction == 'ATTACK'){
      return playerCardDoMove();
  } else {
      return new TimelineLite();
  }
};

export const opponentHealthbarShake = (playerAction) => {
    var timeline = new TimelineLite();
    if(playerAction){
        timeline.to('.opponent-side .healthbar-container .healthbar', .05, {
            x: "+=20",
            yoyo: true,
            repeat: 5
        });    
    }
    return timeline;
};

const playerCardDoBack = () => {
    var timeline = new TimelineLite();

    var fakeCardPosition = $('.player-side .action-card-container .game-card').position();
    var actionCardAtHandPosition = $('.player-side .player-controler .playable-cards ' +
        '.playable-game-card:nth-child(' + (getPlayerState("player").ActionCardIndex+1) +') .game-card').position();

    timeline.to('.player-side .action-card-container .game-card', .5, {
        autoAlpha: 1
    }).to('.player-side .action-card-container .game-card', 1, {
        y: '+=' + (150)
    });

    return timeline;
};

export const playerActionDoBack = (playerAction) => {
  if(playerAction == 'ATTACK'){
      return playerCardDoBack();
  } else {
      return new TimelineLite();
  }
};

export const playerActionContainerDisappear = (playerAction) => {
    if(playerAction == "ATTACK"){
        return playerActionCardDisappear();
    } else if (playerAction == 'SHIELD'){
        return playerShieldDisappear();
    } else return new TimelineLite();
};

export const playerShieldDisappear = () => {
    var timeline = new TimelineLite();
    timeline.to('.player-side .action-card-container .mirror-shield-action', 1, {
        autoAlpha: 0
    });
    return timeline;
};

export const playerActionCardDisappear = () => {
    var timeline = new TimelineLite();
    timeline.to('.player-side .action-card-container .game-card', 1, {
        autoAlpha: 0
    });
    return timeline;
};

export const playerActionCardAnimate = () => {
    var timeline = new TimelineLite();
    timeline.add(
      playerShowSelectedAction('SHIELD')
    ).addLabel(
        "event1"
    ).add(
       playerAreaMinimized(true),
        "event1"
    ).add(
       playerSelectedActionMoveCenter('SHIELD'),
        "event1"
    ).add(
        playerActionDoMove('SHIELD')
    ).add(
        opponentHealthbarShake(true)
    ).addLabel(
        "event2"
    ).add(
        playerActionContainerDisappear('SHIELD'),
        "event2"
    ).add(
        playerAreaMaximized(true),
        "event2"
    );
    timeline.play();
};
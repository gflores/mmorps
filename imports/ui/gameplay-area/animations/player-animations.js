import gsap from 'gsap';

import { getState, getPlayerState, getOpponentState } from '/imports/client/global-data/manage-state.js';
import { getPassiveHealAmount, getMaxHp,
         getPlayAreaMinimizedTime, getPlayAreaMaximizedTime,
         getHandMinimizedTime, getHandMaximizedTime,
         getActionSelectedTime, getActionMoveToCenterTime,
         getActionDoMoveTime, getActionDoBackTime,
         getHealthbarShakeTime, getPlayActionContainerDisappearTime,
         getActionReappearTime } from '/imports/shared/global-variables.js';



export const playerAreaMinimized = () => {
    var playerHand = new TimelineLite();

    playerHand.to(".player-side .player-controler", getHandMinimizedTime(), {
        opacity: .5,
        top: 180,
        position: 'relative'
    });

    console.log("player hand");
    console.log(playerHand);
    return playerHand;
};

export const playerActionCardAreaMinimized = (playerAction, playerLifeDifference, playerNewLife) => {
    var timeline = new TimelineLite();
    timeline.to(".player-side .action-card-container", getPlayAreaMinimizedTime(), {
        y: '+=' + 180,
        position: 'relative'
    });

    if(playerAction == 'SHIELD') {
        timeline.add(() => {
            if (playerLifeDifference > 0)
                executeHealNumberFeedbackForPlayer(playerLifeDifference);
            else
                executeDamageNumberFeedbackForPlayer(-playerLifeDifference);
            setPlayerState("CurrentHp", playerNewLife);
        })
    } else if (playerAction == null) {
        timeline.add(() => {
            if( getPlayerState().CurrentHp < getMaxHp() ) {
                newLife = getPlayerState().CurrentHp + getPassiveHealAmount();
                executeHealNumberFeedbackForPlayer(getPassiveHealAmount());
                setPlayerState("CurrentHp", newLife);
            }
        })
    }
    return timeline;
};

export const playerAreaMaximized = () => {
    var playerHand = new TimelineLite();
    playerHand.to(".player-side .player-controler", getHandMaximizedTime(), {
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
    timeline.to(".player-side .action-card-container", getPlayAreaMaximizedTime(), {
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
    }).to('.player-side .action-card-container .mirror-shield-action', getActionSelectedTime(), {
        autoAlpha: 1,
        scale: 1.5
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
    }).to('.player-side .action-card-container .game-card', getActionSelectedTime(), {
        autoAlpha: 1,
        scale: 1.5
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
    timeline.to('.player-side .action-card-container .mirror-shield-action', getActionMoveToCenterTime(), {
        scale: .8,
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
    timeline.to('.player-side .action-card-container .game-card', getActionMoveToCenterTime(), {
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
    
    timeline.to('.player-side .action-card-container .game-card', getActionDoMoveTime(), {
        y: '-=' + 150,
        autoAlpha: 0
    });

    return timeline;  
};

export const playerActionDoMove = (playerAction, opponentAction, opponentLifeDifference, opponentNewLife, playerLifeDifference, playerNewLife) => {
  if(playerAction == 'ATTACK'){
      if(opponentAction == 'SHIELD'){
          return playerCardDoMove().add ( () => {
              if (playerLifeDifference > 0)
                  executeHealNumberFeedbackForPlayer(playerLifeDifference);
              else
                  executeDamageNumberFeedbackForPlayer(-playerLifeDifference);
              setPlayerState("CurrentHp", playerNewLife);
          });
      } else {
          return playerCardDoMove().add( () => {
              currentHp = getOpponentState().CurrentHp;
              opponentLifeDifference = opponentNewLife - currentHp;
              if (opponentLifeDifference > 0)
                  executeHealNumberFeedbackForOpponent(opponentLifeDifference);
              else
                  executeDamageNumberFeedbackForOpponent(-opponentLifeDifference);

              setOpponentState("CurrentHp", opponentNewLife);
          });    
      }
      
  } else {
      return new TimelineLite();
  }
};

export const opponentHealthbarShake = (playerAction) => {
    var timeline = new TimelineLite();
    if(playerAction == 'ATTACK'){
        timeline.to('.opponent-side .healthbar-container .healthbar', getHealthbarShakeTime(), {
            x: "+=20",
            yoyo: true,
            repeat: 5
        });    
        return timeline;
    } else {
        return timeline;    
    }
    
};

const playerCardDoBack = () => {
    var timeline = new TimelineLite();

    var fakeCardPosition = $('.player-side .action-card-container .game-card').position();
    var actionCardAtHandPosition = $('.player-side .player-controler .playable-cards ' +
        '.playable-game-card:nth-child(' + (getPlayerState("player").ActionCardIndex+1) +') .game-card').position();

    timeline.to('.player-side .action-card-container .game-card', getActionReappearTime(), {
        autoAlpha: 1
    }).to('.player-side .action-card-container .game-card', getActionDoBackTime(), {
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
    timeline.to('.player-side .action-card-container .mirror-shield-action', getPlayActionContainerDisappearTime(), {
        autoAlpha: 0
    });
    return timeline;
};

export const playerActionCardDisappear = () => {
    var timeline = new TimelineLite();
    timeline.to('.player-side .action-card-container .game-card', getPlayActionContainerDisappearTime(), {
        autoAlpha: 0
    });
    return timeline;
};

export const playerActionCardAnimate = () => {
    var timeline = new TimelineLite();
    timeline.add(
      playerShowSelectedAction('ATTACK')
    ).addLabel(
        "event1"
    ).add(
       playerAreaMinimized(),
        "event1"
    ).add(
        playerActionCardAreaMinimized(),
        "event1"
    );
        // .add(
    //    playerSelectedActionMoveCenter('ATTACK'),
    //     "event1"
    // ).add(
    //     playerActionDoMove('ATTACK')
    // ).add(
    //     opponentHealthbarShake(true)
    // ).addLabel(
    //     "event2"
    // ).add(
    //     playerActionContainerDisappear('ATTACK'),
    //     "event2"
    // ).add(
    //     playerAreaMaximized(true),
    //     "event2"
    // ).add(
    //     playerActionCardAreaMaximized(),
    //     "event2"
    // );
    timeline.play();
};
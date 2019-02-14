import gsap from 'gsap';

import { getState, getOpponentState, getPlayerState} from '/imports/client/global-data/manage-state.js';
import { passiveHealAmount, maxHp,
         playAreaMinimizedTime, playAreaMaximizedTime,
         handMinimizedTime, handMaximizedTime,
         actionSelectedTime, actionMoveToCenterTime,
         actionDoMoveTime, actionDoBackTime,
         healthbarShakeTime, playActionContainerDisappearTime,
         actionReappearTime } from '/imports/shared/global-variables.js';

export const opponentAreaMinimized = () => {
    var opponentHand = new TimelineLite();
    opponentHand.to(".opponent-side .player-controler", handMinimizedTime, {
        opacity: .5,
        top: -180,
        position: 'relative'
    });
    console.log("opponent hand");
    console.log(opponentHand);
    return opponentHand;
};

export const opponentActionCardAreaMinimized = (opponentAction, opponentLifeDifference, opponentNewLife) => {
    var timeline = new TimelineLite();
    timeline.to(".opponent-side .action-card-container", playAreaMinimizedTime, {
        y: '-=' + 180,
        position: 'relative'
    });
    
    if(opponentAction == 'SHIELD'){
      timeline.add ( () => {
          if (opponentLifeDifference > 0)
              executeHealNumberFeedbackForOpponent(opponentLifeDifference);
          else
              executeDamageNumberFeedbackForOpponent(-opponentLifeDifference);
          setOpponentState("CurrentHp", opponentNewLife);
      });  
    } else if (opponentAction == null){
        timeline.add(() => {
            if(getOpponentState().CurrentHp < maxHp) {
                newLife = getOpponentState().CurrentHp + passiveHealAmount;
                executeHealNumberFeedbackForOpponent(passiveHealAmount);
                setOpponentState("CurrentHp", newLife);
            }
        })
    }
    return timeline;
};

export const opponentAreaMaximized = () => {
    var opponentHand = new TimelineLite();
    opponentHand.to(".opponent-side .player-controler", handMaximizedTime, {
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
    timeline.to(".opponent-side .action-card-container", playAreaMaximizedTime, {
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

    timeline.to('.opponent-side .action-card-container .mirror-shield-action', .01, {
        y: actionCardAtHandPosition.top - fakeCardPosition.top,
        x: actionCardAtHandPosition.left - fakeCardPosition.left,
        zIndex: 10
    }).to('.opponent-side .action-card-container .mirror-shield-action', actionSelectedTime, {
        autoAlpha: 1,
        scale: 1.5
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
    }).to('.opponent-side .action-card-container .game-card', actionSelectedTime, {
        autoAlpha: 1,
        scale: 1.5
    });
    
    return timeline;
};

export const opponentShowSelectedAction = (opponentAction, playerLifeDifference, playerNewLife) => {
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
    timeline.to('.opponent-side .action-card-container .mirror-shield-action', actionMoveToCenterTime, {
        scale: .8,
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
    timeline.to('.opponent-side .action-card-container .game-card', actionMoveToCenterTime, {
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
    timeline.to('.opponent-side .action-card-container .game-card', actionDoMoveTime, {
        y: '+=' + 150,
        autoAlpha: 0
    });
    return timeline;
};

export const opponentActionDoMove = (opponentAction, playerAction, playerLifeDifference, playerNewLife, opponentLifeDifference, opponentNewLife) => {
    if(opponentAction == 'ATTACK'){
        if(playerAction == 'SHIELD') {
            return opponentCardDoMove().add(() => {
               if (opponentLifeDifference > 0){
                   executeHealNumberFeedbackForOpponent(opponentLifeDifference);
               } else {
                   executeDamageNumberFeedbackForOpponent(-opponentLifeDifference);
               }
                setOpponentState("CurrentHp", opponentNewLife);
            });
        } else {
            return opponentCardDoMove().add(() => {
                currentHp = getPlayerState().CurrentHp;
                playerLifeDifference = playerNewLife - currentHp;
                if (playerLifeDifference > 0)
                    executeHealNumberFeedbackForPlayer(playerLifeDifference);
                else
                    executeDamageNumberFeedbackForPlayer(-playerLifeDifference);
                setPlayerState("CurrentHp", playerNewLife);
            });
        }
    } else {
        return new TimelineLite();
    }
};

export const playerHealthbarShake = (opponentAction) => {
    var timeline = new TimelineLite();
    if(opponentAction == 'ATTACK'){
        timeline.to('.player-side .healthbar-container .healthbar', healthbarShakeTime, {
            x: "+=20",
            yoyo: true,
            repeat: 5
        });
        
        return timeline;
    } else {
        return timeline;    
    }
    
};

const opponentCardDoBack = () => {
    var timeline = new TimelineLite();

    timeline.to('.opponent-side .action-card-container .game-card', actionReappearTime, {
        autoAlpha: 1
    }).to('.opponent-side .action-card-container .game-card', actionDoBackTime, {
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
    timeline.to('.opponent-side .action-card-container .mirror-shield-action', playActionContainerDisappearTime, {
        autoAlpha: 0
    });
    return timeline;
};

const opponentActionCardDisappear = () => {
    var timeline = new TimelineLite();
    timeline.to('.opponent-side .action-card-container .game-card', playActionContainerDisappearTime, {
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
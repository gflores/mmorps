import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { getTextures } from '/imports/client/pixi/textures.js';
import { decidePlayCard, decidePlayShield, decidePlayDrawCards } from '/imports/client/gameplay/player-actions.js';

var state = getState();

export const setupBattleController = function(){
    state.battleController = new PIXI.Container();

    state.battleController.y = getScreenParameters().dimensions.height;

    state.screenContainer.addChild(state.battleController);

    state.battleControllerBackground = new PIXI.Graphics();
    state.battleControllerBackground.beginFill(0x0, 1);
    state.battleControllerBackground.drawRect(0, 0, getScreenParameters().battleControllerDimensions.width, getScreenParameters().battleControllerDimensions.height);
    state.battleControllerBackground.endFill();

    state.battleController.addChild(state.battleControllerBackground);
  
    // shield container
    state.shieldContainer = new PIXI.Container();
    state.shieldSprite = new PIXI.Sprite(getTextures().shield);
    state.shieldSprite.y = 15;
    state.shieldSprite.width = 100;
    state.shieldSprite.height = 120;

    state.shieldSpriteColorMatrix = new PIXI.filters.ColorMatrixFilter();
    state.shieldSprite.filters = [state.shieldSpriteColorMatrix];
    
    state.shieldContainer.addChild(state.shieldSprite);
    state.battleControllerBackground.addChild(state.shieldContainer);

    // add method call
    state.shieldContainer.interactive = true;
    state.shieldContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
            console.log("clicked shield");
            decidePlayShield();
        }
    });

    // draw card container
    state.deckContainer = new PIXI.Container();
    state.deckContainer.x = getScreenParameters().battleControllerDimensions.width / 5;
    state.deckSprite = new PIXI.Sprite(getTextures().drawCard);
    state.deckSprite.y = 15;
    state.deckSprite.width = 100;
    state.deckSprite.height = 120;

    state.deckSpriteColorMatrix = new PIXI.filters.ColorMatrixFilter();
    state.deckSprite.filters = [state.deckSpriteColorMatrix];
    
    state.deckContainer.addChild(state.deckSprite);
    state.battleControllerBackground.addChild(state.deckContainer);

    // add method call
    state.deckContainer.interactive = true;
    state.deckContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('clicked deck');
          decidePlayDrawCards();
        }
    });

    // current cards container

    var textStyle = {
        fill: '#ffec00',
        fontSize: '25px',
        fontWeight: 'bold'
    };

    state.currentCardOneContainer = new PIXI.Container();
    state.currentCardOneContainer.x = getScreenParameters().battleControllerDimensions.width * 2 / 5;

    state.currentCardOne = new PIXI.Sprite();
    state.currentCardOne.x = 0;
    state.currentCardOne.y = 15;
    state.currentCardOne.width = 100;
    state.currentCardOne.height = 120;

    state.currentCardOneColorMatrix = new PIXI.filters.ColorMatrixFilter();
    state.currentCardOne.filters = [state.currentCardOneColorMatrix];
    
    state.currentCardOneValueTop = new PIXI.Text('', textStyle);
    state.currentCardOneValueTop.x = 5;
    state.currentCardOneValueTop.y = 15;

    state.currentCardOneValueBot = new PIXI.Text('', textStyle);
    state.currentCardOneValueBot.x = 80;
    state.currentCardOneValueBot.y = 105;

    state.currentCardOneContainer.addChild(state.currentCardOne);
    state.currentCardOneContainer.addChild(state.currentCardOneValueTop);
    state.currentCardOneContainer.addChild(state.currentCardOneValueBot);


    state.currentCardTwoContainer = new PIXI.Container();
    state.currentCardTwoContainer.x = getScreenParameters().battleControllerDimensions.width * 3 / 5;

    state.currentCardTwo = new PIXI.Sprite();
    state.currentCardTwo.y = 15;
    state.currentCardTwo.width = 100;
    state.currentCardTwo.height = 120;

    state.currentCardTwoColorMatrix = new PIXI.filters.ColorMatrixFilter();
    state.currentCardTwo.filters = [state.currentCardTwoColorMatrix];
    
    state.currentCardTwoValueTop = new PIXI.Text('', textStyle);
    state.currentCardTwoValueTop.x = 5;
    state.currentCardTwoValueTop.y = 15;

    state.currentCardTwoValueBot = new PIXI.Text('', textStyle);
    state.currentCardTwoValueBot.x = 80;
    state.currentCardTwoValueBot.y = 105;


    state.currentCardTwoContainer.addChild(state.currentCardTwo);
    state.currentCardTwoContainer.addChild(state.currentCardTwoValueTop);
    state.currentCardTwoContainer.addChild(state.currentCardTwoValueBot);


    state.currentCardThreeContainer = new PIXI.Container();
    state.currentCardThreeContainer.x = getScreenParameters().battleControllerDimensions.width * 4 / 5;

    state.currentCardThree = new PIXI.Sprite();
    state.currentCardThree.y = 15;
    state.currentCardThree.width = 100;
    state.currentCardThree.height = 120;

    state.currentCardThreeColorMatrix = new PIXI.filters.ColorMatrixFilter();
    state.currentCardThree.filters = [state.currentCardThreeColorMatrix];
    
    state.currentCardThreeValueTop = new PIXI.Text('', textStyle);
    state.currentCardThreeValueTop.x = 5;
    state.currentCardThreeValueTop.y = 15;

    state.currentCardThreeValueBot = new PIXI.Text('', textStyle);
    state.currentCardThreeValueBot.x = 80;
    state.currentCardThreeValueBot.y = 105;

    state.currentCardThreeContainer.addChild(state.currentCardThree);
    state.currentCardThreeContainer.addChild(state.currentCardThreeValueTop);
    state.currentCardThreeContainer.addChild(state.currentCardThreeValueBot);

    state.battleControllerBackground.addChild(state.currentCardOneContainer);
    state.battleControllerBackground.addChild(state.currentCardTwoContainer);
    state.battleControllerBackground.addChild(state.currentCardThreeContainer);

    // add method call
    state.currentCardOneContainer.interactive = true;
    state.currentCardOneContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('play card 1');
          decidePlayCard(0);
        }
    });
    state.currentCardTwoContainer.interactive = true;
    state.currentCardTwoContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('play card 2');
          decidePlayCard(1);
        }
    });
    state.currentCardThreeContainer.interactive = true;
    state.currentCardThreeContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('play card 3');
          decidePlayCard(2);
        }
    });


    // hover states
    state.shieldContainer.on('mouseover', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x*1.1, state.currentCardOne.scale.y*1.1);

            var centerX = state.shieldSprite.x + state.shieldSprite.width/2;
            var centerY = state.shieldSprite.y + state.shieldSprite.height/2;

            state.shieldSprite.scale.x = state.shieldSprite.scale.x * 1.1;
            state.shieldSprite.scale.y = state.shieldSprite.scale.y * 1.1;
            state.shieldSprite.x = centerX - state.shieldSprite.width /2;
            state.shieldSprite.y = centerY - state.shieldSprite.height /2;

            state.shieldSpriteColorMatrix.brightness(.3);
        }
    });
    state.shieldContainer.on('mouseout', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x/1.1, state.currentCardOne.scale.y/1.1);
            var centerX = state.shieldSprite.x + state.shieldSprite.width/2;
            var centerY = state.shieldSprite.y + state.shieldSprite.height/2;

            state.shieldSprite.scale.x = state.shieldSprite.scale.x / 1.1;
            state.shieldSprite.scale.y = state.shieldSprite.scale.y / 1.1;
            state.shieldSprite.x = centerX - state.shieldSprite.width /2;
            state.shieldSprite.y = centerY - state.shieldSprite.height /2;

            state.shieldSpriteColorMatrix.reset();
        }
    });

    state.deckContainer.on('mouseover', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x*1.1, state.currentCardOne.scale.y*1.1);

            var centerX = state.deckSprite.x + state.deckSprite.width/2;
            var centerY = state.deckSprite.y + state.deckSprite.height/2;

            state.deckSprite.scale.x = state.deckSprite.scale.x * 1.1;
            state.deckSprite.scale.y = state.deckSprite.scale.y * 1.1;
            state.deckSprite.x = centerX - state.deckSprite.width /2;
            state.deckSprite.y = centerY - state.deckSprite.height /2;

            state.deckSpriteColorMatrix.brightness(.3);
        }
    });
    state.deckContainer.on('mouseout', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x/1.1, state.currentCardOne.scale.y/1.1);
            var centerX = state.deckSprite.x + state.deckSprite.width/2;
            var centerY = state.deckSprite.y + state.deckSprite.height/2;

            state.deckSprite.scale.x = state.deckSprite.scale.x / 1.1;
            state.deckSprite.scale.y = state.deckSprite.scale.y / 1.1;
            state.deckSprite.x = centerX - state.deckSprite.width /2;
            state.deckSprite.y = centerY - state.deckSprite.height /2;


            state.deckSpriteColorMatrix.reset();
        }
    });


    state.currentCardOneContainer.on('mouseover', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x*1.1, state.currentCardOne.scale.y*1.1);
            
            var centerX = state.currentCardOne.x + state.currentCardOne.width/2;
            var centerY = state.currentCardOne.y + state.currentCardOne.height/2;

            state.currentCardOne.scale.x = state.currentCardOne.scale.x * 1.1;
            state.currentCardOne.scale.y = state.currentCardOne.scale.y * 1.1;
            state.currentCardOne.x = centerX - state.currentCardOne.width /2;
            state.currentCardOne.y = centerY - state.currentCardOne.height /2;


            state.currentCardOneColorMatrix.brightness(.3);
        }
    });
    state.currentCardOneContainer.on('mouseout', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x/1.1, state.currentCardOne.scale.y/1.1);
            var centerX = state.currentCardOne.x + state.currentCardOne.width/2;
            var centerY = state.currentCardOne.y + state.currentCardOne.height/2;

            state.currentCardOne.scale.x = state.currentCardOne.scale.x / 1.1;
            state.currentCardOne.scale.y = state.currentCardOne.scale.y / 1.1;
            state.currentCardOne.x = centerX - state.currentCardOne.width /2;
            state.currentCardOne.y = centerY - state.currentCardOne.height /2;

            state.currentCardOneColorMatrix.reset();
        }
    });

    state.currentCardTwoContainer.on('mouseover', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x*1.1, state.currentCardOne.scale.y*1.1);

            var centerX = state.currentCardTwo.x + state.currentCardTwo.width/2;
            var centerY = state.currentCardTwo.y + state.currentCardTwo.height/2;

            state.currentCardTwo.scale.x = state.currentCardTwo.scale.x * 1.1;
            state.currentCardTwo.scale.y = state.currentCardTwo.scale.y * 1.1;
            state.currentCardTwo.x = centerX - state.currentCardTwo.width /2;
            state.currentCardTwo.y = centerY - state.currentCardTwo.height /2;

            
            state.currentCardTwoColorMatrix.brightness(.3);


        }
    });
    state.currentCardTwoContainer.on('mouseout', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x/1.1, state.currentCardOne.scale.y/1.1);
            var centerX = state.currentCardTwo.x + state.currentCardTwo.width/2;
            var centerY = state.currentCardTwo.y + state.currentCardTwo.height/2;

            state.currentCardTwo.scale.x = state.currentCardTwo.scale.x / 1.1;
            state.currentCardTwo.scale.y = state.currentCardTwo.scale.y / 1.1;
            state.currentCardTwo.x = centerX - state.currentCardTwo.width /2;
            state.currentCardTwo.y = centerY - state.currentCardTwo.height /2;

            state.currentCardTwoColorMatrix.reset();
        }
    });

    state.currentCardThreeContainer.on('mouseover', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x*1.1, state.currentCardOne.scale.y*1.1);

            var centerX = state.currentCardThree.x + state.currentCardThree.width/2;
            var centerY = state.currentCardThree.y + state.currentCardThree.height/2;

            state.currentCardThree.scale.x = state.currentCardThree.scale.x * 1.1;
            state.currentCardThree.scale.y = state.currentCardThree.scale.y * 1.1;
            state.currentCardThree.x = centerX - state.currentCardThree.width /2;
            state.currentCardThree.y = centerY - state.currentCardThree.height /2;

            state.currentCardThreeColorMatrix.brightness(.3);
        }
    });
    state.currentCardThreeContainer.on('mouseout', () => {
        if (state.isDecidingPhase == true){
            // state.currentCardOne.setTransform(state.currentCardOne.x, state.currentCardOne.y, state.currentCardOne.scale.x/1.1, state.currentCardOne.scale.y/1.1);
            var centerX = state.currentCardThree.x + state.currentCardThree.width/2;
            var centerY = state.currentCardThree.y + state.currentCardThree.height/2;

            state.currentCardThree.scale.x = state.currentCardThree.scale.x / 1.1;
            state.currentCardThree.scale.y = state.currentCardThree.scale.y / 1.1;
            state.currentCardThree.x = centerX - state.currentCardThree.width /2;
            state.currentCardThree.y = centerY - state.currentCardThree.height /2;

            state.currentCardThreeColorMatrix.reset();
        }
    });

}




export const updateBattleController = function(player){
    updatePlayerShieldBattleController(player.canPlayShield);
    updatePlayerCardsBattleController(player.currentCards);
}


function updatePlayerCardsBattleController(currentCards){
    console.log("player current cards", currentCards);
    state.currentCardOne.texture = getCardTexture(currentCards[0])
    if(currentCards[0]){
        state.currentCardOneValueTop.text = (currentCards[0].value).toString();
        state.currentCardOneValueBot.text = (currentCards[0].value).toString();
    } else {
        state.currentCardOneValueTop.text = "";
        state.currentCardOneValueBot.text = "";
    }
    
    state.currentCardTwo.texture = getCardTexture(currentCards[1]);
    if(currentCards[1]){
        state.currentCardTwoValueTop.text = (currentCards[1].value).toString();
        state.currentCardTwoValueBot.text = (currentCards[1].value).toString();    
    } else {
        state.currentCardTwoValueTop.text = "";
        state.currentCardTwoValueBot.text = "";
    }
    
    state.currentCardThree.texture = getCardTexture(currentCards[2]);
    if(currentCards[2]){
        state.currentCardThreeValueTop.text = (currentCards[2].value).toString();
        state.currentCardThreeValueBot.text = (currentCards[2].value).toString();    
    } else {
        state.currentCardThreeValueTop.text = "";
        state.currentCardThreeValueBot.text = "";
    }
}

function getCardTexture(card){
    if(card == null){
      return getTextures().blank;
    } else if(card.element == 'PAPER'){
        return getTextures().paperCard;
    } else if (card.element == 'SCISSOR'){
        return getTextures().scissorCard;
    } else if (card.element == 'ROCK'){
        return getTextures().rockCard;
    }
}

function updatePlayerShieldBattleController(canPlayShield){
    if(canPlayShield){
        state.shieldSprite.texture = getTextures().shield;
    } else {
        state.shieldSprite.texture = getTextures().blank;
    }
}
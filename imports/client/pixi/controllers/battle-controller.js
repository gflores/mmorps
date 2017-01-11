import { getState } from "/imports/client/global-data/manage-state.js";
import { getScreenParameters } from '/imports/client/pixi/setup-game-ui.js';
import { getTextures } from '/imports/client/pixi/textures.js';

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
    
    state.shieldContainer.addChild(state.shieldSprite);
    state.battleControllerBackground.addChild(state.shieldContainer);

    // add method call
    state.shieldContainer.interactive = true;
    state.shieldContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
            console.log("clicked shield");
            Meteor.call('PlayShield');
        }
    });

    // draw card container
    state.deckContainer = new PIXI.Container();
    state.deckContainer.x = getScreenParameters().battleControllerDimensions.width / 5;
    state.deckSprite = new PIXI.Sprite(getTextures().shield);
    state.deckSprite.y = 15;
    state.deckSprite.width = 100;
    state.deckSprite.height = 120;

    state.deckContainer.addChild(state.deckSprite);
    state.battleControllerBackground.addChild(state.deckContainer);

    // add method call
    state.deckContainer.interactive = true;
    state.deckContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('clicked deck');
          Meteor.call('DrawCards');
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
          Meteor.call('PlayCard', 0);
        }
    });
    state.currentCardTwoContainer.interactive = true;
    state.currentCardTwoContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('play card 2');
          Meteor.call('PlayCard', 1);
        }
    });
    state.currentCardThreeContainer.interactive = true;
    state.currentCardThreeContainer.on('mousedown', () => {
        if (state.isDecidingPhase == true){
          console.log('play card 3');
          Meteor.call('PlayCard', 2);
        }
    });


}
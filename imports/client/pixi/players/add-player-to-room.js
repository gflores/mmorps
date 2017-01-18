import { getState } from "/imports/client/global-data/manage-state.js";
import { getTextures } from "/imports/client/pixi/textures.js";

var state = getState();

setMainSprite = function(player, texture){
    player.mainSprite = texture;

    player.renderContainer.addChild(player.mainSprite)

    player.mainSprite.height = 40;
    player.mainSprite.width = 40;

    player.mainSprite.x = -20; // relative to the renderContainer, effectively placing the center correctly
    player.mainSprite.y = -20;

    player.mainSprite.interactive = true;
    player.mainSprite.on('mousedown', () => {
        if(state.isDecidingPhase == true){
            console.log("clicking target, ", player.id, " in deciding phase");
            Meteor.call('PickTarget', player.id);
        }
    });

}

setHealthBar = function(player){
    player.healthbarSprite = new PIXI.Graphics();

    player.renderContainer.addChild(player.healthbarSprite)

    var width = 70;
    var height = 12;

    player.healthbarSprite.lineStyle(2, 0x222222, 1);
    player.healthbarSprite.beginFill(0xFF0000);
    player.healthbarSprite.drawRect(0, 0, width, height);
    player.healthbarSprite.endFill();
    player.healthbarSprite.x = -( (width + 1) / 2);
    player.healthbarSprite.y = -40;


    player.healthbarDamageSprite = new PIXI.Graphics();

    player.renderContainer.addChild(player.healthbarDamageSprite)

    var damageWidth = (width - 2) * 0.2;
    var damageHeight = 10;

    player.healthbarDamageSprite.beginFill(0x222222);
    player.healthbarDamageSprite.drawRect(0, 0, damageWidth, height);
    player.healthbarDamageSprite.endFill();
    player.healthbarDamageSprite.x = player.healthbarSprite.x + width - damageWidth - 1;
    player.healthbarDamageSprite.y = -39;
}

setPlayerCards = function(player){
    if (player.currentCards){
      //Create & position cards
      player.currentCardSprites = [ new PIXI.Graphics(), new PIXI.Graphics(),  new PIXI.Graphics() ];
      player.currentCardSprites[0].x = 50;
      player.currentCardSprites[0].y = -15;
      player.currentCardSprites[1].x = 83;
      player.currentCardSprites[1].y = -15;
      player.currentCardSprites[2].x = 66.5;
      player.currentCardSprites[2].y = 14;

      //Style card values
      var textStyle = {
          fill: '#ffec00',
          fontSize: '18px',
          fontWeight: 'bold'
      };

      //Create & position cards
      player.currentCardValues = [
        new PIXI.Text(player.currentCards[0].value, textStyle),
        new PIXI.Text(player.currentCards[1].value, textStyle),
        new PIXI.Text(player.currentCards[2].value, textStyle)
      ];
      player.currentCardValues[0].x = 45;
      player.currentCardValues[0].y = -25;
      player.currentCardValues[1].x = 78;
      player.currentCardValues[1].y = -25;
      player.currentCardValues[2].x = 61.5;
      player.currentCardValues[2].y = 4;

      for (var i = 0; i != player.currentCards.length; ++i){
        player.renderContainer.addChild(player.currentCardSprites[i]);
        player.renderContainer.addChild(player.currentCardValues[i]);

        //Draw & style card sprite
        switch(player.currentCards[i].element) {
          case 'ROCK':
            player.currentCardSprites[i].beginFill(0xA52A2A);
            break;
          case 'PAPER':
            player.currentCardSprites[i].beginFill(0x6AA84F);
            break;
          case 'SCISSOR':
            player.currentCardSprites[i].beginFill(0xE50000);
            break;
          default:
            player.currentCardSprites[i].beginFill(0x808080);
        }
        player.currentCardSprites[i].drawCircle(0, 0, 16);
        player.currentCardSprites[i].endFill();
      }
    }
}

export const addOtherPlayerToRoom = function(player){
    state.otherPlayers[player.id] = player;
    state.allPlayers.push(player);

    player.position = new Vector2(player.position.x, player.position.y);
    if (player.finalWantedPosition != null)
        player.finalWantedPosition = new Vector2(player.finalWantedPosition.x, player.finalWantedPosition.y);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    setMainSprite(player, new PIXI.Sprite(getTextures().otherPlayer));
    setHealthBar(player);
    setPlayerCards(player);
}

export const setMainPlayer = function(player){
    console.log("set main player called");
    state.player = player;
    state.allPlayers.push(player);

    player.position = new Vector2(player.position.x, player.position.y);

    player.renderContainer = new PIXI.Container();

    state.gameMap.addChild(player.renderContainer);

    setMainSprite(player, new PIXI.Sprite(getTextures().mainPlayer));
    setHealthBar(player);
    setPlayerCards(player);
}

export const removeOtherPlayer = function(playerId){
    var player = getState().otherPlayers[playerId];
    if (player == null){
        console.log("ERROR: no player to remove");
        return ;
    }
    state.gameMap.removeChild(player.renderContainer);

    var index = null;
    for (i in getState().allPlayers){
        if(getState().allPlayers[i].id == playerId){
            index = i;
            break;
        }
    }
    getState().allPlayers.splice(index,1);
    // remove from otherPlayers object
    delete getState().otherPlayers[playerId];
}

window.addOtherPlayerToRoom = addOtherPlayerToRoom;
window.setMainPlayer = setMainPlayer;

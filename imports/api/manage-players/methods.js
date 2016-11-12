import { Wait } from '/imports/helpers/wait.js';
import { LaunchAsync } from '/imports/helpers/async.js';

import { getGameData, resetGameData } from '/imports/api/game-data/game-data.js';
import { getPlayerKeys, resetPlayerKeys } from '/imports/api/manage-players/player-keys.js';

import { generateStartingCards, getResult } from '/imports/api/cards/cards.js';


Meteor.methods({
    JoinGame: () => {
        hand = [];
        gameData = getGameData();
        playerKeys = getPlayerKeys();

        deck = generateStartingCards();

        hand.push(deck.pop());
        hand.push(deck.pop());
        hand.push(deck.pop());
        
        if (playerKeys.length < 2) {
            playerKeys.push(Meteor.userId());
        }
        gameData[Meteor.userId()] = {
            hp: 100,
            currentCards: hand,
            remainingCardsStack: deck,
            action: null,
            actionCardIndex: null
        };
        console.log("player keys: ", playerKeys);
        console.log("current game: ", gameData);
    },

    ResetGame: () => {
        resetGameData();
    },

    ResetKeys: () => {
        resetPlayerKeys();    
    },
    
    TestWait: () => {
        console.log("A: 1");
        Wait(3000);

        console.log("A: 2");
        LaunchAsync(() => {
            console.log("B: 1");
            Wait(1500);

            console.log("B: 2");
            Wait(2000);

            console.log("B: 3");

        });
        Wait(2000);

        console.log("A: 3");
    },

    PlayCard: (cardIndex) => {
        playerId = Meteor.userId();
        gameData = getGameData();
        if(gameData[playerId]){
            gameData[playerId].action = 'ATTACK';
            gameData[playerId].actionCardIndex = cardIndex;
        }
        console.log(gameData);
    },

    PlayShield: () => {
        playerId = Meteor.userId();
        gameData = getGameData();
        if(gameData[playerId]){
            gameData[playerId].action = 'SHIELD';
        }
        console.log(gameData);
    },

    PlayGame: () => {
        gameData = getGameData();
        console.log("New Round");

        
        LaunchAsync(()=>{
           console.log("awaiting players input");
            Wait(900);
            console.log("7");
            Wait(1000);
            console.log("6");
            Wait(1000);
            console.log("5");
            Wait(1000);
            console.log("4");
            Wait(1000);
            console.log("3");
            Wait(1000);
            console.log("2");
            Wait(1000);
            console.log("1");
        });
        Wait(8000);
        // waiting for user to type in their input
        console.log("computing result");
        Meteor.call('ComputeResult');
        Wait(3000);
        console.log("finished animation");
        console.log("result: ", gameData);
    },

    ComputeResult: (userId) => {
        gameData = getGameData();
        console.log(gameData);
    }, 
    
    GenerateCardsTest: () => {
        deck = generateStartingCards();
        console.log(deck);
        console.log("drawing 3 cards");
        console.log(deck.pop());
        console.log(deck.pop());
        console.log(deck.pop());
        console.log("remaining deck");
        console.log(deck);
        console.log("new deck");
        console.log(generateStartingCards());
    },
    
    ComputeResult: () => {
        gameData = getGameData();
        playerKeys = getPlayerKeys();
        playerOne = gameData[playerKeys[0]];
        playerTwo = gameData[playerKeys[1]];

        console.log("player one's hand", playerOne.currentCards);
        console.log("player two's hand", playerTwo.currentCards);
        
        if (playerOne.action == 'ATTACK' && playerTwo.action == 'ATTACK'){
            playerOneCard = playerOne.currentCards[playerOne.actionCardIndex];
            playerTwoCard = playerTwo.currentCards[playerTwo.actionCardIndex];
            result = getResult(playerOneCard.element, playerTwoCard.element);
            console.log("player one card: ");
            console.log(playerOneCard);
            console.log("player two card");
            console.log(playerTwoCard);
            console.log("result");
            console.log(result);

            if (result == 1) {
                attackValue = playerOneCard.value + playerTwoCard.value;
                playerOne.hp += attackValue;
                playerTwo.hp -= attackValue;
            } else if (result == 0) {
                attackValue = playerOneCard.value - playerTwoCard.value;
                if (attackValue > 0) {
                    playerTwo.hp -= attackValue;
                } else {
                    playerOne.hp += attackValue;
                }
            } else if (result == -1) {
                attackValue = playerOneCard.value + playerTwoCard.value;
                playerOne.hp -= attackValue;
                playerTwo.hp += attackValue;
            }

            playerOne.currentCards.splice(playerOne.actionCardIndex, 1);
            playerTwo.currentCards.splice(playerTwo.actionCardIndex, 1);
        } else if (playerOne.action == 'ATTACK' && playerTwo.action == 'SHIELD') {
            playerOneCard = playerOne.currentCards[playerOne.actionCardIndex];
            playerTwo.hp -= 5;
            attackValue = playerOneCard.value;
            playerOne.hp -= attackValue;

            playerOne.currentCards.splice(playerOne.actionCardIndex, 1);
        } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'ATTACK') {
            playerTwoCard = playerTwo.currentCards[playerTwo.actionCardIndex];
            playerTwo.hp -= 5;
            attackValue = playerTwoCard.value;
            playerTwo.hp -= attackValue;

            playerTwo.currentCards.splice(playerTwo.actionCardIndex, 1);
        } else if (playerOne.action == 'SHIELD' && playerTwo.action == 'SHIELD'){
            playerOne.hp -= 5;
            playerTwo.hp -= 5;
        } else if (playerOne.action == null && playerTwo.action == null) {
            
        }

        // reset player's actions
        playerOne.action = null;
        playerOne.actionCardIndex = null;
        playerTwo.action = null;
        playerTwo.actionCardIndex = null;
        
        // if player's hand is empty, reload 3 new cards
        if(playerOne.currentCards.length == 0){
            newCards = [];
            newCards.push(playerOne.remainingCardStack.pop());
            newCards.push(playerOne.remainingCardStack.pop());
            newCards.push(playerOne.remainingCardStack.pop());
            playerOne.currentCards = newCards;
        }

        if (playerTwo.currentCards.length == 0) {
            newCards = [];
            newCards.push(playerTwo.remainingCardStack.pop());
            newCards.push(playerTwo.remainingCardStack.pop());
            newCards.push(playerTwo.remainingCardStack.pop());
            playerTwo.currentCards = newCards;
        }

        console.log(gameData);
    }
});


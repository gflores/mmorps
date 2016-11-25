import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { autoUserCreate } from '/imports/client/users/auto-user-create.js';
import { joinMainGame, resetMainGame, endMainGame} from '/imports/client/manage-game-room/join-game.js';

import { playerAreaMinimized, playerAreaMaximized} from '/imports/ui/gameplay-area/animations/animations.js';

require("./MainOptionsArea.scss");

export class MainOptionsArea extends Component {
    
    endGame() {
        console.log("end game clicked");
        endMainGame();        
    }

    joinGame() {
        joinMainGame();

    }

    resetGame() {
        resetMainGame();
    }

    playerAreaMinimized() {
/*        bindPlayerHand();*/
        console.log("player-hand-minimized clicked");
        playerAreaMinimized();
    }

    playerAreaMaximized() {
        console.log("player-hand-maximized clicked");
        playerAreaMaximized();
    }

    render(){
        return (
            <div className="main-options-area">
                <button onClick={ () => this.joinGame() }> Join Game</button>
                <br />
                <button onClick={ () => this.resetGame() }> Reset Game</button>
                <br />
                <button onClick={ () => this.endGame() }> End Game </button>
                <br />
                <button onClick={ () => this.playerAreaMinimized() }> Player Hand Minimized </button>
                <br />
                <button onClick={ () => this.playerAreaMaximized() }> Player Hand Maximized </button>
                user: { Meteor.userId() }
            </div>
        )
    }
};
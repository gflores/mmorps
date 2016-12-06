import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { autoUserCreate } from '/imports/client/users/auto-user-create.js';
import { joinMainGame, resetMainGame, endMainGame} from '/imports/client/manage-game-room/join-game.js';

import { playerActionCardAnimate} from '/imports/ui/gameplay-area/animations/player-animations.js';
import { opponentActionCardAnimate } from '/imports/ui/gameplay-area/animations/opponent-animations.js';

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
    animatePlayerCard() {
        console.log("player-hand-maximized clicked");
        playerActionCardAnimate();
    }

    render(){
        return (
            <div className="main-options-area">
                <button onClick={ () => this.joinGame() }> Join Game</button>
                <br />
                <button onClick={ () => this.endGame() }> End Game </button>
                <br />
                user: { Meteor.userId() }
            </div>
        )
    }
};
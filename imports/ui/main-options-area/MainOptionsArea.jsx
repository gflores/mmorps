import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { autoUserCreate } from '/imports/client/users/auto-user-create.js';
import { joinMainGame, launchMainGame, resetMainGame} from '/imports/client/manage-game-room/join-game.js';

require("./MainOptionsArea.scss");

export class MainOptionsArea extends Component {
    
    createUser() {
        autoUserCreate();
    }

    joinGame() {
        joinMainGame();

    }

    resetGame() {
        resetMainGame();
    }

    render(){
        return (
            <div className="main-options-area">
                <button onClick={ () => this.joinGame() }> Join Game</button>
                <br />
                <button onClick={ () => this.resetGame() }> Reset Game</button>
                <br />
                user: { Meteor.userId() }
            </div>
        )
    }
};
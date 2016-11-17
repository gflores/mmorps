import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { autoUserCreate } from '/imports/client/users/auto-user-create.js';
import { joinMainGame, launchMainGame, resetMainGame} from '/imports/client/manage-game-room/join-game.js';

export class MainOptionsArea extends Component {
    
    createUser() {
        autoUserCreate();
    }

    joinGame() {
        joinMainGame();
    }

    launchGame() {
        launchMainGame();
    }

    resetGame() {
        resetMainGame();
    }

    render(){
        return (
            <div>
                <button onClick={ () => this.joinGame() }> Join Game</button>
                <br />
                <button onClick={ () => this.launchGame() }> Launch Game</button>
                <br />
                <button onClick={ () => this.resetGame() }> Reset Game</button>
                <br />
                user: { Meteor.userId() }
            </div>
        )
    }
};
import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

export class MainOptionsArea extends Component {
    
    createUser() {
        var id = Math.floor((Math.random() * 1000000000)).toString();
        var password = "password";

        Accounts.createUser({
            username: id,
            password: password
        });
    }

    joinGame() {
        Meteor.call('JoinMainGame');
    }

    joinGame() {
        Meteor.call('LaunchMainGame');
    }

    resetGame() {
        Meteor.call('ResetMainGame');
    }

    render(){
        return (
            <div>
                <button onClick={ () => this.createUser() }> Create User</button>
                <br />
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
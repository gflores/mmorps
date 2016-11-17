import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

export class GameplayArea extends Component {
    render(){
        return (
            <div>
                gameplay
                <br />

                <button onClick={ () => Meteor.call('testServerMessage_A') }>
                    testServerMessage_A
                </button>
                <br />

                <button onClick={ () => Meteor.call('testServerMessage_B') }>
                    testServerMessage_B
                </button>
                <br />
            </div>
        )
    }
};
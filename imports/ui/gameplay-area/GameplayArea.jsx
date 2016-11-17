import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

export class GameplayArea extends Component {
    
    playCard(index) {
        Meteor.call('PlayCard', index);
    }
    
    playShield() {
        Meteor.call('PlayShield');
    }
    
    render(){
        return (
            <div>
                { Meteor.userId() ?
                    <div>
                        <button onClick={ () => this.playCard(1) } > Play Card 1</button>
                        <button onClick={ () => this.playCard(2) } > Play Card 2</button>
                        <button onClick={ () => this.playCard(3) } > Play Card 3</button>
                        <button onClick={ () => this.playShield() } > Play Shield</button>
                    </div>
                :
                    <p>GamePlay</p>
                }
            </div>
        )
    }
};
import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { GameCard } from '/imports/ui/gameplay-area/game-card/GameCard.jsx'

import { getState } from '/imports/client/global-data/manage-state.js';

require("./PlayableGameCard.scss");

export class PlayableGameCard extends Component {
    
    playCard() {
        Meteor.call('PlayCard', this.props.index);
    }
        
    getElementClassName() {
        return this.props.gameCard.element.toLowerCase()
    }
    
    render(){
        return (
            <div className={ "playable-game-card " + this.getElementClassName() }>
                <GameCard gameCard={ this.props.gameCard } onClickEvent={ () => this.playCard() }/>
            </div>
        )
    }
};
import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { GameCard } from '/imports/ui/gameplay-area/game-card/GameCard.jsx'

import { getState } from '/imports/client/global-data/manage-state.js';

import { playCard } from '/imports/client/gameplay/player-actions.js';

require("./PlayableGameCard.scss");

export class PlayableGameCard extends Component {
    
    playCard() {
        if (this.props.preventClick == true){

        } else {
            playCard(this.props.index);
        }
    }
        
    getElementClassName() {
        return this.props.gameCard ? this.props.gameCard.element.toLowerCase() : "";
    }
    
    render(){
        return (
            <div className={ "playable-game-card " + this.getElementClassName() }>
            {   this.props.gameCard ?
                <GameCard gameCard={ this.props.gameCard } onClickEvent={ () => this.playCard() }/>
            :
                <div className="empty">
                </div>
            }
            </div>
        )
    }
};
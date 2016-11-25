import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { GameCard } from '/imports/ui/gameplay-area/game-card/GameCard.jsx'

import { getState, getPlayerState } from '/imports/client/global-data/manage-state.js';

import { decidePlayCard } from '/imports/client/gameplay/player-actions.js';

require("./PlayableGameCard.scss");

export class PlayableGameCard extends Component {
    
    playCard() {
        if (this.props.isPlayerSide == true){
            decidePlayCard(this.props.index);
        }
    }
        
    getElementClassName() {
        return this.props.gameCard ? this.props.gameCard.element.toLowerCase() : "";
    }
    
    getSelectedClassName() {
        var playerState = getPlayerState();
        if (this.props.isPlayerSide == true && playerState.Action == "ATTACK" && playerState.ActionCardIndex == this.props.index)
            return " selected"
        return "";
    }
    render(){
        return (
            <div className={ "playable-game-card " + this.getElementClassName() + this.getSelectedClassName() }>
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
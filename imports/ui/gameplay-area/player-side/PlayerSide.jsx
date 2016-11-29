import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState, getPlayerState} from '/imports/client/global-data/manage-state.js';

import { decidePlayShield } from '/imports/client/gameplay/player-actions.js';

import { PlayableGameCard } from './playable-game-card/PlayableGameCard.jsx'
import { Healthbar } from './healthbar/Healthbar.jsx'

import { GameCard } from '/imports/ui/gameplay-area/game-card/GameCard.jsx'

require("./PlayerSide.scss");

export class PlayerSide extends Component {
    
    playShield() {
        decidePlayShield();
    }
    
    getCard(index){
        return this.props.player["Card["+index+"]"];
    }

    getSelectedClassName() {
        var playerState = getPlayerState();
        if (playerState.Action == "SHIELD")
            return " selected"
        return "";
    }

    getActionCard() {
        return this.props.player["Card[" + this.props.player.ActionCardIndex + "]"];
    }

    showCSSProperty() {
        var property = $('.action-card-container .game-card').position();
        console.log(property);
        var controllerActionCardPosition =
            $('.player-side .player-controler .playable-cards .playable-game-card:nth-child(' + (getPlayerState("player").ActionCardIndex+1) +')').position();
        console.log(controllerActionCardPosition);
    }

    render(){
        return (
            <div className="player-side game-player-side">
                <div className="action-card-container" onClick={ () => this.showCSSProperty() }>
                    { this.props.player["Card[" + this.props.player.ActionCardIndex + "]"]?
                        <GameCard gameCard={this.getActionCard()} />:
                        null
                    }
                </div>
                <div className="player-controler">
                    <div className={ "mirror-shield-action" + this.getSelectedClassName() } onClick={ () => this.playShield() }>
                        <img className="image" src={ "/images/mirror_shield.png" }/>
                    </div>
                    <div className="playable-cards">
                        <PlayableGameCard gameCard={ this.getCard(0) } index={ 0 } isPlayerSide={ true }/>
                        <PlayableGameCard gameCard={ this.getCard(1) } index={ 1 } isPlayerSide={ true }/>
                        <PlayableGameCard gameCard={ this.getCard(2) } index={ 2 } isPlayerSide={ true }/>
                    </div>
                </div>

                <div className="healthbar-container">
                    <Healthbar currentHp={ this.props.player.CurrentHp } maxHp={ this.props.player.MaxHp }/>
                </div>
            </div>
        )
    }
};
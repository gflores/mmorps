import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState, getOpponentState, getPlayerState } from '/imports/client/global-data/manage-state.js';

import { PlayableGameCard } from '/imports/ui/gameplay-area/player-side/playable-game-card/PlayableGameCard.jsx'
import { Healthbar } from '/imports/ui/gameplay-area/player-side/healthbar/Healthbar.jsx'
import { GameCard } from '/imports/ui/gameplay-area/game-card/GameCard.jsx'


require("./OpponentSide.scss");

export class OpponentSide extends Component {
    
    getCard(index){
        return this.props.player["Card["+index+"]"];
    }

    getActionCard() {
        return this.props.player["Card[" + this.props.player.ActionCardIndex + "]"];
    }

    render(){
        return (
            <div className="opponent-side game-player-side">
                <div className="healthbar-container">
                    <Healthbar currentHp={ this.props.player.CurrentHp } maxHp={ this.props.player.MaxHp }/>
                </div>

                <div className="damage-number-feedback">
                </div>

                <div className="player-controler">
                    <div className="mirror-shield-action">
                        <img className="image" src={ "/images/mirror_shield.png" }/>
                    </div>
                    <div className="playable-cards">
                        <PlayableGameCard gameCard={ this.getCard(0) } index={ 0 } isPlayerSide={ false }/>
                        <PlayableGameCard gameCard={ this.getCard(1) } index={ 1 } isPlayerSide={ false }/>
                        <PlayableGameCard gameCard={ this.getCard(2) } index={ 2 } isPlayerSide={ false }/>
                    </div>
                </div>

                <div className="action-card-container" onClick={ () => this.showCSSProperty() }>
                    { this.props.player["Card[" + this.props.player.ActionCardIndex + "]"]?
                        <GameCard gameCard={ this.getActionCard() } />:
                        null
                    }
                </div>
            </div>
        )
    }
};
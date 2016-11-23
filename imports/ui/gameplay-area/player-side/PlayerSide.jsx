import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

import { playShield } from '/imports/client/gameplay/player-actions.js';

import { PlayableGameCard } from './playable-game-card/PlayableGameCard.jsx'
import { Healthbar } from './healthbar/Healthbar.jsx'

require("./PlayerSide.scss");

export class PlayerSide extends Component {
    
    playShield() {
        playShield();
    }
    
    getCard(index){
        return this.props.player["Card["+index+"]"];
    }

    render(){
        return (
            <div className="player-side game-player-side">
                <div className="player-controler">
                    <div className="mirror-shield-action" onClick={ () => this.playShield() }>
                        <img className="image" src={ "/images/mirror_shield.png" }/>
                    </div>
                    <div className="playable-cards">
                        <PlayableGameCard gameCard={ this.getCard(0) } index={ 0 }/>
                        <PlayableGameCard gameCard={ this.getCard(1) } index={ 1 }/>
                        <PlayableGameCard gameCard={ null } index={ 2 }/>
                    </div>
                </div>

                <div className="healthbar-container">
                    <Healthbar currentHp={ this.props.player.CurrentHp } maxHp={ this.props.player.MaxHp }/>
                </div>
            </div>
        )
    }
};
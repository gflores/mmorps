import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

import { PlayableGameCard } from '/imports/ui/gameplay-area/player-side/playable-game-card/PlayableGameCard.jsx'
import { Healthbar } from '/imports/ui/gameplay-area/player-side/healthbar/Healthbar.jsx'

require("./OpponentSide.scss");

export class OpponentSide extends Component {
    
    getCard(index){
        return this.props.player["Card["+index+"]"];
    }

    render(){
        return (
            <div className="opponent-side game-player-side">
                <div className="healthbar-container">
                    <Healthbar currentHp={ this.props.player.CurrentHp } maxHp={ this.props.player.MaxHp }/>
                </div>

                <div className="player-controler">
                    <div className="mirror-shield-action">
                        <img className="image" src={ "/images/mirror_shield.png" }/>
                    </div>
                    <div className="playable-cards">
                        <PlayableGameCard gameCard={ this.getCard(0) } index={ 0 } preventClick={ true }/>
                        <PlayableGameCard gameCard={ this.getCard(1) } index={ 1 } preventClick={ true }/>
                        <PlayableGameCard gameCard={ this.getCard(2) } index={ 2 } preventClick={ true }/>
                    </div>
                </div>
            </div>
        )
    }
};
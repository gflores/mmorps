import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState, getPlayerState, getOpponentState} from '/imports/client/global-data/manage-state.js';

import { PlayerSide } from '/imports/ui/gameplay-area/player-side/PlayerSide.jsx'
import { OpponentSide } from '/imports/ui/gameplay-area/opponent-side/OpponentSide.jsx'

require("./GameplayArea.scss");

export class GameplayArea extends Component {
    
    render(){
        return (
            <div className="gameplay-area">
                <OpponentSide player={ getOpponentState() }/>
            
                <PlayerSide player={ getPlayerState() }/>
            </div>
        )
    }
};
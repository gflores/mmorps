import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState, getPlayerState} from '/imports/client/global-data/manage-state.js';

import { PlayerSide } from '/imports/ui/gameplay-area/player-side/PlayerSide.jsx'
import { OpponentSide } from '/imports/ui/gameplay-area/opponent-side/OpponentSide.jsx'
import { DecidingPhaseCountdown } from '/imports/ui/gameplay-area/deciding-phase-countdown/DecidingPhaseCountdown.jsx';

require("./GameplayArea.scss");

export class GameplayArea extends Component {
    
    render(){
        return (
            <div className="gameplay-area">
                <OpponentSide player={ getPlayerState() }/>
                { getState().currentPhase == "DECIDING_PHASE" ?
                    <DecidingPhaseCountdown time={ 5 }/>
                :
                    null
                }
                <PlayerSide player={ getPlayerState() }/>
            </div>
        )
    }
};
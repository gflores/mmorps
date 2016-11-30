import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState, getPlayerState, getOpponentState, isGameFinished} from '/imports/client/global-data/manage-state.js';

import { EndOfGameScreen } from '/imports/ui/gameplay-area/end-of-game-screen/EndOfGameScreen.jsx'

import { PlayerSide } from '/imports/ui/gameplay-area/player-side/PlayerSide.jsx'
import { OpponentSide } from '/imports/ui/gameplay-area/opponent-side/OpponentSide.jsx'
import { DecidingPhaseCountdown } from '/imports/ui/gameplay-area/deciding-phase-countdown/DecidingPhaseCountdown.jsx';

require("./GameplayArea.scss");

export class GameplayArea extends Component {
    
    render(){
        return (
            <div className="gameplay-area">

                { isGameFinished() == true ?
                    <EndOfGameScreen />
                :
                    null
                }
                <OpponentSide player={ getOpponentState() }/>
                { getState().currentPhase == "DECIDING_PHASE" ?
                    <DecidingPhaseCountdown time={ getState().roundTimeLimit / 1000 }/>
                :
                    null
                }
                <PlayerSide player={ getPlayerState() }/>
            </div>
        )
    }
};
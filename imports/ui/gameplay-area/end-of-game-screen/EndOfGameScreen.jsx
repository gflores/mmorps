import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState, getPlayerState, getOpponentState, isWinner, isLoser} from '/imports/client/global-data/manage-state.js';

import { PlayerSide } from '/imports/ui/gameplay-area/player-side/PlayerSide.jsx'
import { OpponentSide } from '/imports/ui/gameplay-area/opponent-side/OpponentSide.jsx'
import { DecidingPhaseCountdown } from '/imports/ui/gameplay-area/deciding-phase-countdown/DecidingPhaseCountdown.jsx';

require("./EndOfGameScreen.scss");

export class EndOfGameScreen extends Component {
    
    winnerText(){
        if (isWinner() == true)
            return "YOU WIN !";
        else if (isLoser() == true)
            return "YOU LOSE !";
    }

    render(){
        return (
            <div className="end-of-screen">
                { this.winnerText() }
            </div>
        )
    }
};
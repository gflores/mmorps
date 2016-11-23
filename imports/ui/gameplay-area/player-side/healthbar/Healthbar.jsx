import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

import { FillingBar } from '/imports/ui/gameplay-area/filling-bar/FillingBar.jsx';

require("./Healthbar.scss");

export class Healthbar extends Component {
    healthToRatio(){
        return this.props.currentHp / this.props.maxHp;
    }
    render(){
        return (
            <div className="healthbar">
                <FillingBar ratio={ this.healthToRatio() }/>
                <div className="text-info">
                    { this.props.currentHp } / { this.props.maxHp }
                </div>
            </div>
        )
    }
};
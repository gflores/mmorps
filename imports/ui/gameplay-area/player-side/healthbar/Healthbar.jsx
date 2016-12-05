import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

import { FillingBar } from '/imports/ui/gameplay-area/filling-bar/FillingBar.jsx';

require("./Healthbar.scss");

export class Healthbar extends Component {
    healthToRatio(){
        currentHp = this.props.currentHp < 0 ? 0 : this.props.currentHp;
        return currentHp / this.props.maxHp;
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
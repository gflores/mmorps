import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

require("./FillingBar.scss");

export class FillingBar extends Component {
    ratioToPercentage(){
        return this.props.ratio * 100;
    }
    render(){
        return (
            <div className="filling-bar" style={ {width: this.ratioToPercentage() + "%"} }>
            </div>
        )
    }
};
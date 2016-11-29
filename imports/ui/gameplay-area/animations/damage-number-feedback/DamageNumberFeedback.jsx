import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

require("./DamageNumberFeedback.scss");

export class DamageNumberFeedback extends Component {
    render(){
        return (
            <div className="damage-number-feedback">
                <div class="text-info">
                    { this.props.value }
                </div>
            </div>
        )
    }
};
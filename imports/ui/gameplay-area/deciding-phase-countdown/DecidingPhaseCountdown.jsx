import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

import { FillingBar } from '/imports/ui/gameplay-area/filling-bar/FillingBar.jsx';

require("./DecidingPhaseCountdown.scss");

export class DecidingPhaseCountdown extends Component {
    componentWillMount(){
        this.setState({
            maxTime: this.props.time,
            currentTime: this.props.time
        });
    }

    componentDidMount(){
        this.intervalId = Meteor.setInterval(() =>{
            var newCurrentTime = this.state.currentTime - 1;
            this.setState({
                currentTime: newCurrentTime
            });

            if (newCurrentTime <= 0) {
                Meteor.clearInterval(this.intervalId);
            }
        }, 1000)
    }

    componentWillUnmount(){
        Meteor.clearInterval(this.handler);
        Meteor.clearInterval(this.intervalId);
    }

    getRatio(){
        return 1 - (this.state.currentTime / this.state.maxTime);
    }

    render(){
        return (
            <div className="deciding-phase-countdown">
                <FillingBar ratio={ this.getRatio() } />
            </div>
        );
    }
};
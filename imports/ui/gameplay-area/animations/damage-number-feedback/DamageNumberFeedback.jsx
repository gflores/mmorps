import React, {Component} from 'react';
import { unmountComponentAtNode } from 'react-dom';

import { getState } from '/imports/client/global-data/manage-state.js';

require("./DamageNumberFeedback.scss");

export class DamageNumberFeedback extends Component {
    componentDidMount(){
        Meteor.setTimeout(() => {
            unmountComponentAtNode(this.props.rootDom);
        }, 2000);

        console.log("this.refs: ", this.refs, "this.refs-damage-number-feedback: ", this.refs["damage-number-feedback"]);
        feedback = $(this.refs["damage-number-feedback"]);

        Meteor.setTimeout(() => {
            feedback.css("transform", "translateY(-100px)")
        }, 200);

        Meteor.setTimeout(() => {
            feedback.css("font-size", "80px")
        }, 200);

        Meteor.setTimeout(() => {
            feedback.css("opacity", "0")
        }, 1500);
    }

    getValue(){
        return this.props.isHeal == true ? "+" + this.props.value : this.props.value;
    }

    getHealClass(){
        return this.props.isHeal == true ? "is-heal" : "";
    }
    render(){
        return (
            <div ref="damage-number-feedback" className={"damage-number-feedback " + this.getHealClass()}>
                <div className="text-info">
                    { this.getValue() }
                </div>
            </div>
        )
    }
};
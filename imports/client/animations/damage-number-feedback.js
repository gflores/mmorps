import React, {Component} from 'react';
import { render } from 'react-dom';

import { DamageNumberFeedback } from '/imports/ui/gameplay-area/animations/damage-number-feedback/DamageNumberFeedback.jsx';

export const executeDamageNumberFeedbackForPlayer = function(value){
    var componentRootDom = $('.player-side .damage-number-feedback').get(0);
    render(
        <DamageNumberFeedback value={ value } rootDom={ componentRootDom }/>,
        componentRootDom
    );
}

export const executeDamageNumberFeedbackForOpponent = function(value){
    var componentRootDom = $('.opponent-side .damage-number-feedback').get(0);
    render(
        <DamageNumberFeedback value={ value } rootDom={ componentRootDom }/>,
        componentRootDom
    );
}

export const executeHealNumberFeedbackForPlayer = function(value){
    var componentRootDom = $('.player-side .damage-number-feedback').get(0);
    render(
        <DamageNumberFeedback value={ value } rootDom={ componentRootDom } isHeal={ true }/>,
        componentRootDom
    );
}

export const executeHealNumberFeedbackForOpponent = function(value){
    var componentRootDom = $('.opponent-side .damage-number-feedback').get(0);
    render(
        <DamageNumberFeedback value={ value } rootDom={ componentRootDom } isHeal={ true }/>,
        componentRootDom
    );
}

window.executeDamageNumberFeedbackForPlayer = executeDamageNumberFeedbackForPlayer;
window.executeDamageNumberFeedbackForOpponent = executeDamageNumberFeedbackForOpponent;

window.executeHealNumberFeedbackForPlayer = executeHealNumberFeedbackForPlayer;
window.executeHealNumberFeedbackForOpponent = executeHealNumberFeedbackForOpponent;
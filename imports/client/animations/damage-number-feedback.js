import React, {Component} from 'react';
import { render } from 'react-dom';

import { DamageNumberFeedback } from '/imports/ui/gameplay-area/animations/damage-number-feedback/DamageNumberFeedback.jsx';

import { getStrongDamageAudio, getWeakDamageAudio, getNormalDamageAudio} from '/imports/client/audio/damage-sounds.js';

playSoundFromDamageValue = function(value) {
    if (value == 0)
        getWeakDamageAudio().play();
    else if (value <= 7)
        getNormalDamageAudio().play();
    else if (value > 7)
        getStrongDamageAudio().play();
}

export const executeDamageNumberFeedbackForPlayer = function(value){
    playSoundFromDamageValue(value);

    var componentRootDom = $('.player-side .damage-number-feedback').get(0);
    render(
        <DamageNumberFeedback value={ value } rootDom={ componentRootDom }/>,
        componentRootDom
    );
}

export const executeDamageNumberFeedbackForOpponent = function(value){
    playSoundFromDamageValue(value);

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
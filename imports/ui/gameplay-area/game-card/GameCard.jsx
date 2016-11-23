import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

import { getState } from '/imports/client/global-data/manage-state.js';

require("./GameCard.scss");

export class GameCard extends Component {
    
    getImagePath(){
        if (this.props.gameCard.element == "ROCK")
            return "/images/card_rock.png";
        if (this.props.gameCard.element == "SCISSOR")
            return "/images/card_scissor.png";
        else if (this.props.gameCard.element == "PAPER")
            return "/images/card_paper.png";
    }

    getElementClassName() {
        return this.props.gameCard.element.toLowerCase()
    }

    onClickOnCard() {
        if (this.props.onClickEvent != null)
            this.props.onClickEvent();
    }
    render(){
        return (
            <div className={ "game-card " + this.getElementClassName() } onClick={ () => this.onClickOnCard() }>
                <img className="card-image" src={ this.getImagePath() }/>
                <div className="value top"> { this.props.gameCard.value } </div>
                <div className="value bottom"> { this.props.gameCard.value } </div>
            </div>
        )
    }
};
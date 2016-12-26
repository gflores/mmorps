import React, { Component } from 'react';

import { getState } from '/imports/client/global-data/manage-state.js';

export default class DebugMenu extends Component {

    addPlayer(){
        Meteor.call('JoinMainGame');
    }
    
    endDebugGameTrue() {
        Meteor.call('endGameDebugTrue');
    }
    
    endDebugGameFalse() {
        Meteor.call('endGameDebugFalse');
    }

    getMainGameStatus(){
        console.log("client state status", getState());
        // Meteor.call('getGameDataStatus');
    }

    dash(e){
        e.preventDefault();
        x = parseFloat(this.refs.x.value);
        y = parseFloat(this.refs.y.value);
        console.log("updating position", x, y);
        Meteor.call('dash', x, y);
    }
    
    playCard(e){
        e.preventDefault();
        x = parseFloat(this.refs.x.value);
        y = parseFloat(this.refs.y.value);
        Meteor.call('PlayCard', 0, 0, 0, getState().allPlayers[0].id);
    }

    target(){
        Meteor.call('target');
    }
    
    render(){
        return (
            <div className="debug-menu">
                <div className="row">
                    <button onClick={ this.addPlayer.bind(this) }>
                        Join Game
                    </button>
                    <button onClick={ this.endDebugGameTrue.bind(this) }>
                        End Debug Game True
                    </button>
                    <button onClick={ this.endDebugGameFalse.bind(this) }>
                        End Debug Game False
                    </button>
                    <button onClick={ this.getMainGameStatus.bind(this) }>
                        Game Status
                    </button>
                </div>
                <div className="row">
                    <form role="form" onSubmit={ this.playCard.bind(this) }>
                        <input type="text" ref="x" name="x"/>
                        <input type="text" ref="y" name="y"/>
                        <input type="submit" value="Play Card with Dash Position"/>
                    </form>
                    <button onClick={ this.target.bind(this) }>
                        Target
                    </button>
                </div>

            </div>
            
        )
    }
}
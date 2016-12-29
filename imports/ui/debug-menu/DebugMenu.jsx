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
        Meteor.call('Dash', x, y);
    }
    
    playCard(e){
        e.preventDefault();
        x = parseFloat(this.refs.x.value);
        y = parseFloat(this.refs.y.value);
        Meteor.call('PlayCard', 0);
    }

    playShield(){
        Meteor.call('PlayShield');
    }
    
    pickTarget(){
        var targetPlayerId = null;
        for(key in getState().otherPlayers){
            if(key != Meteor.userId()){
                targetPlayerId = key;
                break;
            }
        }
        Meteor.call('PickTarget', targetPlayerId);
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
                    <button onClick={ this.playCard.bind(this) }>
                        Play Card
                    </button>
                    <button onClick={ this.pickTarget.bind(this) }>
                        Target Player
                    </button>
                    <button onClick={ this.playShield.bind(this) }>
                        Play Shield
                    </button>
                    <form role="form" onSubmit={ this.dash.bind(this) }>
                        <input type="text" ref="x" name="x"/>
                        <input type="text" ref="y" name="y"/>
                        <input type="submit" value="Play Card with Dash Position"/>
                    </form>
                    
                </div>

            </div>
            
        )
    }
}
import React, { Component } from 'react';

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
        Meteor.call('getGameDataStatus');
    }

    updatePosition(e){
        e.preventDefault();
        x = parseFloat(this.refs.x.value);
        y = parseFloat(this.refs.y.value);
        console.log("updating position", x, y);
        Meteor.call('moveToCoordinates', x, y);
    }
    
    render(){
        return (
            <div className="debug-menu">
                <div className="row">
                    
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
                    <form role="form" onSubmit={ this.updatePosition.bind(this) }>
                        <input type="text" ref="x" name="x"/>
                        <input type="text" ref="y" name="y"/>
                        <input type="submit" value="Move Here"/>
                    </form>
                </div>
            </div>
            
        )
    }
}
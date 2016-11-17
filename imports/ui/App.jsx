import React, { Component } from 'react';

import { MainOptionsArea } from '/imports/ui/main-options-area/MainOptionsArea.jsx';
import { GameplayArea } from '/imports/ui/gameplay-area/GameplayArea.jsx';

var app = null;

export class App extends Component {
    componentWillMount(){
        app = this;
    }
    render() {
        return (
            <div className="app">
                <MainOptionsArea />
                <GameplayArea />
            </div>
        );
    }
}

export const getApp = () => {
    return app;
}
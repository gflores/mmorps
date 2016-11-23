import React, { Component } from 'react';

import { MainOptionsArea } from '/imports/ui/main-options-area/MainOptionsArea.jsx';
import { GameplayArea } from '/imports/ui/gameplay-area/GameplayArea.jsx';

import { getState } from '/imports/client/global-data/manage-state.js';

export class Main extends Component {
    render() {
        return (
            <div className="main">
                <MainOptionsArea />
                { getState().gameStarted == true ?
                    <GameplayArea />
                :
                    null
                }

            </div>
        );
    }
}


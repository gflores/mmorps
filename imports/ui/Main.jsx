import React, { Component } from 'react';

import { getReactState } from '/imports/client/global-data/manage-state.js';

 import DebugMenu from '/imports/ui/debug-menu/DebugMenu.jsx';

export class Main extends Component {
    render() {
        return (
            <div className="main">
                <div id="pixi-game-ui">
                </div>
                <DebugMenu/>
            </div>
        );
    }
}


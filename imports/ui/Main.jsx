import React, { Component } from 'react';

import { getState } from '/imports/client/global-data/manage-state.js';

 import DebugMenu from '/imports/ui/debug-menu/DebugMenu.jsx';

export class Main extends Component {
    render() {
        return (
            <div className="main">
                <DebugMenu/>
            </div>
        );
    }
}


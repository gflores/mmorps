import '/imports/startup/client/index.js';

import React from 'react';
import { render } from 'react-dom';
 
import App from '/imports/ui/App.jsx';
 
Meteor.startup(() => {
    render(<App />, document.getElementById('render-target'));
});
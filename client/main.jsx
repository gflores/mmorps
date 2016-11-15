import '/imports/client/startup.js';

import React from 'react';
import { render } from 'react-dom';
 
import Container from '/imports/ui/Container.jsx';
 
Meteor.startup(() => {
    render(<Container />, document.getElementById('render-target'));
});
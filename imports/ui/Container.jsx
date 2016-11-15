import { App } from '/imports/ui/App.jsx';

import { composeWithTracker } from 'react-komposer';



export default composeWithTracker((props, onData) => {
    var userSubscription = Meteor.subscribe("users");

    if (userSubscription.ready()){
        onData(null, {
            users: Meteor.users.find().fetch()
        });
    }

})(App);
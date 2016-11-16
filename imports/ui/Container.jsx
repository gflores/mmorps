import { App } from '/imports/ui/App.jsx';

import { composeWithTracker } from 'react-komposer';



export default composeWithTracker((props, onData) => {

    onData(null, {_user: Meteor.user()});


    // var userSubscription = Meteor.subscribe("users");

    // if (userSubscription.ready()){
    //     onData(null, {
    //         users: Meteor.users.find().fetch()
    //     });
    // }

})(App);
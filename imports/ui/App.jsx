import React, { Component } from 'react';

import { composeWithTracker } from 'react-komposer';

import { Main } from './Main.jsx';

import { initialSetup } from '/imports/client/initial-setup.js';



var app = null;

export const getApp = () => {
    return app;
}


class App extends Component {
    componentWillMount(){
        app = this;

        this.setState({});
    } 
    componentDidMount(){
        initialSetup();
        this.setState({isAppMounted: true});
    }
    render() {
        return ( this.state.isAppMounted == false ?
            <div className="not-mounted">
            </div>
        :
            <div className="app">
                <Main />
            </div>
        );
    }
}

export const AppContainer = composeWithTracker((props, onData) => {

    onData(null, {_user: Meteor.user()});


    // var userSubscription = Meteor.subscribe("users");

    // if (userSubscription.ready()){
    //     onData(null, {
    //         users: Meteor.users.find().fetch()
    //     });
    // }

})(App);


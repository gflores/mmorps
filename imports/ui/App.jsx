import React, { Component } from 'react';

import { Login } from './account/Login.jsx';

var app = null;

export class App extends Component {
    componentWillMount(){
        app = this;
    }
    render() {
        console.log('render App');
        return (
            <div className="app">
                <Login/>
            </div>
        );
    }
}

export const getApp = () => {
    return app;
}
import React, { Component } from 'react';

import Login from './account/Login.jsx';

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Login/>
            </div>
        );
    }
}
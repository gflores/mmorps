import { setState, getState } from '/imports/client/global-data/manage-state.js';

export const setupInitialState = function(){
    setState({
        loggedIn: false,
        roomJoined: false,
        roomLaunched: false,
        gameStarted: false,

        test: 1
    });
};
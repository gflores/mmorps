import { setReactState } from '/imports/client/global-data/manage-state.js';

export const setupInitialReactState = function(){
    setReactState({
        loggedIn: false,
        gameJoined: false
    });
};
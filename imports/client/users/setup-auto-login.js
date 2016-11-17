import { setState } from '/imports/client/global-data/manage-state.js';
import { autoUserCreate } from '/imports/client/users/auto-user-create.js';


onLogin = function(){
    console.log("Accounts.onLogin");
    setState({loggedIn: true});
}

export const setupAutoLogin = function(){
    console.log("setupAutoLogin");

    Accounts.onLogin(() => {
        onLogin();
    })
    Meteor.subscribe('user', () => {
        if (Meteor.userId() == null){
            autoUserCreate();
        } else {
            onLogin();
        }
    });

}
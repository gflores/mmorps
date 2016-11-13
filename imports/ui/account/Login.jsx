import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

class Login extends Component {
    
    createAccount(event) {
        event.preventDefault();

        // create new username and password
        var username = this.refs.username.value.trim();
        var password = "pass";
        Accounts.createUser({
            username: username,
            password: password
        });
        return true;
    }
    
    displayLoginUI(){
        if (Meteor.userId()){
            return (
                <span>Welcome, {Meteor.user().username}</span>
            )
            
        } else {
            return (
                <div className="registerUser">
                    <form className="register" onSubmit={this.createAccount.bind(this)}>
                        <label>Username</label>
                        <input type="text" ref="username" name="username"/>
                        <br/>
                        <input type="submit" value="Start"/>
                    </form>
                </div>
            )
        }
    }
    
    render(){
        return (
            <div>
                {this.displayLoginUI()}
            </div>
        )
    }
};

export default composeWithTracker((props, onData) => {
    var userSubscription = Meteor.subscribe("users");

    if (userSubscription.ready()){
        onData(null, {
            users: Meteor.users.find().fetch()
        });
    }

})(Login);
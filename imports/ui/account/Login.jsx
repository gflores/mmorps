import React, {Component} from 'react';
import { composeWithTracker } from 'react-komposer';

export class Login extends Component {
    
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

    render(){
        console.log('render Login');
        return (
            <div>
                { Meteor.userId() ?
                    <span>Welcome, { Meteor.user().username }</span>
                :
                    <div className="registerUser">
                        <form className="register" onSubmit={this.createAccount.bind(this)}>
                            <label>Username</label>
                            <input type="text" ref="username" name="username"/>
                            <br/>
                            <input type="submit" value="Start"/>
                        </form>
                    </div>
                }
            </div>
        )
    }
};
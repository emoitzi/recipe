import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import {createContainer } from 'meteor/react-meteor-data';
import { Accounts, STATES } from 'meteor/std:accounts-ui';


class SignIn extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <h1>Anmelden</h1>
          <div>
            <Accounts.ui.LoginForm formState={STATES.SIGN_IN} />
          </div>
        </div>
      </div>
    )
  }
}

export default SignInContainer = createContainer(() => {
  return {};
}, SignIn);

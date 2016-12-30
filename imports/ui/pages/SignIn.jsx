import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import {createContainer } from 'meteor/react-meteor-data';
import  Blaze from 'meteor/gadicc:blaze-react-component';

class SignIn extends Component {

  render() {
    return (
      <div>
        <div className="container">
          <h1>Anmelden</h1>
          <div>
            <Blaze template="atForm" />
          </div>
        </div>
      </div>
    )
  }
}

export default SignInContainer = createContainer(() => {
  return {};
}, SignIn);

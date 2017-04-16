import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import {createContainer } from 'meteor/react-meteor-data';
import  Blaze from 'meteor/gadicc:blaze-react-component';

class SignIn extends Component {

  componentDidUpdate() {
    console.log('signin DidUpdate', this.props.loggedIn);
    if (this.props.loggedIn) {
      browserHistory.push('/');
    }
  }
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

SignIn.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

export default SignInContainer = createContainer(() => {
  return {
    loggedIn: Meteor.userId() ? true:false,
  };
}, SignIn);

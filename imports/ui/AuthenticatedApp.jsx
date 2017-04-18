import React, {Component, PropTypes } from 'react';
import {createContainer } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import NavBar from './components/NavBar.jsx';


class AuthenticatedApp extends Component {
  componentWillMount() {
    if (!this.props.loggedIn) {
      browserHistory.push('/signin');
    }
  }
  componentDidUpdate() {
    if (!this.props.loggedIn) {
      browserHistory.push('/signin');
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <NavBar />
          {this.props.children}
        </div>
      </div>
    )
  }
}

AuthenticatedApp.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
}

export default AuthenticatedAppContainer = createContainer(() => {
  return {
    loggedIn: Meteor.userId() ? true:false,
  };
}, AuthenticatedApp);

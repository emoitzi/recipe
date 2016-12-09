import React, {Component } from 'react';
import {createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './components/AccountsUIWrapper.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <AccountsUIWrapper />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  return {};
}, App);

import React, {Component } from 'react';
import {createContainer } from 'meteor/react-meteor-data';

import AccountsUIWrapper from './components/AccountsUIWrapper.jsx';


class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AppContainer = createContainer(() => {
  return {};
}, App);

import React, {Component } from 'react';
import {createContainer } from 'meteor/react-meteor-data';

class NotFound extends Component {
  render() {
    return (
      <div className="container">
        <h1>404 - Page not found</h1>

      </div>

    )
  }
}

export default createContainer(() => {
  return {};
}, NotFound);

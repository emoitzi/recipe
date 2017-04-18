import React, {Component, PropTypes } from 'react';
import {createContainer } from 'meteor/react-meteor-data';

import CreateUser from './components/admin/CreateUser.jsx';

class AdminApp extends Component {
  render() {
    if (!this.props.isAdmin) {
      return (
        <div className="container">
          <p>Forbidden</p>
        </div>
      )
    }
    return (
      <div>
        <div className="container">
          <h1>Administration</h1>
          <h2>Benutzer</h2>
          <ul className="list-group">
          {
            this.props.users.map((user) => (
              <li className="list-group-item" key={user._id}> {user.username}</li>
            ))
          }
          </ul>
          <CreateUser />

        </div>
      </div>
    )
  }
}

AdminApp.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  users: PropTypes.array,
}

export default AdminAppContainer = createContainer(() => {
  let isAdmin = false;
  Meteor.subscribe("userData");
  if (Meteor.userId()) {
    const user = Meteor.users.findOne(Meteor.userId());
    isAdmin = user && user.isAdmin ? true : false;
  }
  return {
    isAdmin: isAdmin,
    users: Meteor.users.find({}).fetch(),
  };
}, AdminApp);

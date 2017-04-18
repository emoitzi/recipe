import React, {Component, PropTypes } from 'react';
import {createContainer } from 'meteor/react-meteor-data';

import { Categories } from '../api/categories.js'
import CreateUser from './components/admin/CreateUser.jsx';
import CreateCategory from './components/admin/CreateCategory.jsx';

class AdminApp extends Component {

  deleteCategory(categoryId) {
    Meteor.call('categories.remove', categoryId, (err) => {
        if (err) {
          console.log(err);
        }
    });
  }
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
          <h2>Kategorien</h2>
          <ul className="list-group">
          {
            this.props.categories.map((category) => (
              <li className="list-group-item" key={category._id}>
                { category.name }
                <button type="button" className="close" aria-label="Close" onClick= {this.deleteCategory.bind(this, category._id)}>
                  <span aria-hidden="true">&times;</span>
                  </button>
              </li>
            ))
          }
          </ul>
          <CreateCategory />
        </div>
      </div>
    )
  }
}

AdminApp.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  users: PropTypes.array,
  categories: PropTypes.array,
}

export default AdminAppContainer = createContainer(() => {
  let isAdmin = false;
  Meteor.subscribe("userData");
  Meteor.subscribe("categories");
  if (Meteor.userId()) {
    const user = Meteor.users.findOne(Meteor.userId());
    isAdmin = user && user.isAdmin ? true : false;
  }
  return {
    isAdmin: isAdmin,
    users: Meteor.users.find({}).fetch(),
    categories: Categories.find({}).fetch(),
  };
}, AdminApp);

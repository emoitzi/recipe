import { Meteor } from 'meteor/meteor'
import React, {Component } from 'react';
//import '../../../api/users.js';

export default class CreateUser extends Component {
  valueChange(e) {
    let new_state ={};
    new_state[e.target.name] = e.target.value;
    this.setState(new_state);
  }
  onSubmit(e) {
    e.preventDefault();
    Meteor.call('users.insert', this.state, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={ this.onSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="username">Benutzername</label>
          <input type="text" className="form-control" id="username" name="username" onChange={ this.valueChange.bind(this )} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Passwort</label> 
          <input type="text" className="form-control" id="password" name="password" onChange={ this.valueChange.bind(this)} />
        </div>
        <button type="submit" className="btn btn-default">Benutzer erstellen</button>
      </form>
    )
  }
}

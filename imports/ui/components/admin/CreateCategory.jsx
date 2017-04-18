import { Meteor } from 'meteor/meteor'
import React, {Component } from 'react';

export default class CreateCategory extends Component {
  valueChange(e) {
    let new_state ={};
    new_state[e.target.name] = e.target.value;
    this.setState(new_state);
  }
  onSubmit(e) {
    e.preventDefault();
    Meteor.call('categories.insert', this.state.name, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <form className="form-inline" onSubmit={ this.onSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={ this.valueChange.bind(this )} />
        </div>
        <button type="submit" className="btn btn-default">Kategorie erstellen</button>
      </form>
    )
  }
}

import React, { Component } from 'react';
import { IndexLink } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Rezepte</h1>
        <IndexLink to="/recipe/add">Rezept hinzufügen</IndexLink>
      </div>

    )
  }
}

import React, {Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';


class Ingredients extends Component {
  constructor(props) {
    props.ingredients = props.ingredients || {};
    super(props);

  }
  renderLine(ingredient, index) {
    return (
      <tr key={index}>
        <td> {ingredient.amount} {ingredient.unit}</td>
        <td> {ingredient.ingredient} </td>
      </tr>
    )
  }
  renderTable() {
    console.log(this.props.ingredients);
    const value = this.props.ingredients;
    let self = this;
    return value.map(function (ingredient, index) {
      return self.renderLine(ingredient, index);
    })
  }
  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Menge</th>
            <th>Zutat</th>
          </tr>
        </thead>
        <tbody>
          {
            this.renderTable()
          }
        </tbody>
      </table>
    )
  }
}


Ingredients.propTypes = {
  ingredients: PropTypes.array.isRequired,
}

export default createContainer ( ({ingredients}) => {
  return {
    ingredients: ingredients,
  }

}, Ingredients);

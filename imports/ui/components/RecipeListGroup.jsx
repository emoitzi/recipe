import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';

import RecipeListItem from '../components/RecipeListItems';
import { Recipes } from '../../api/recipes.js'

class RecipeListGroup extends Component {

  renderRecipes() {
    return this.props.recipes.map((recipe) => {
      return (
        <RecipeListItem key={ recipe._id } recipe={recipe} image_id={recipe.titleImage} />
      )
    });
  }

  render() {
    if ( this.props.recipes.length === 0){
      return null;
    }
    return (
      <div>
        <h2> { this.props.name } </h2>
        <ul className="grid row recipe-grid">
        { this.renderRecipes() }
        </ul>
      </div>
    )
  }
}


RecipeListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  recipes: PropTypes.array.isRequired,
}

export default createContainer ( ({category_id, category_name}) => {
  Meteor.subscribe('recipes');
  return {
    recipes: Recipes.find({category: category_id}).fetch(),
    name: category_name,
  }

}, RecipeListGroup);

import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Recipes } from '../../api/recipes.js'
import RecipeListItem from '../components/RecipeListItems';

 class Home extends Component {

   renderRecipes() {
     return this.props.recipes.map((recipe) => {
       console.log("renderRecipes: ", recipe.titleImage)
       return (
         <RecipeListItem recipe={recipe} image_id={recipe.titleImage} />
       )
     });
   }

  render() {
    return (
      <div>
        <h1>Rezepte</h1>
        <IndexLink to="/recipe/add">Rezept hinzufügen</IndexLink>
        <ul className="grid row">
          { this.renderRecipes() }
        </ul>
      </div>

    )
  }
}

export default createContainer ( () => {
  Meteor.subscribe('recipes');
  return {
    recipes: Recipes.find({}).fetch(),
  }
}, Home);

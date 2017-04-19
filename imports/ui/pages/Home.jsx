import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Recipes } from '../../api/recipes.js'
import RecipeListItem0 from '../components/RecipeListItems0';

 class Home extends Component {

   renderRecipes() {
     let ids = Array.from({length: 1084}, (v, k) => k);  
     return ids.map((id) => {
       return (
         <RecipeListItem0 key={ id } id={id} />
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

import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { IndexLink } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Recipes } from '../../api/recipes.js'
import RecipeListItem from '../components/RecipeListItems';

 class Home extends Component {
   constructor(props) {
     super(props);
     this.positionAddButton = this.positionAddButton.bind(this);
   }

   renderRecipes() {
     return this.props.recipes.map((recipe) => {
       return (
         <RecipeListItem key={ recipe._id } recipe={recipe} image_id={recipe.titleImage} />
       )
     });
   }

  render() {
    return (
      <div>
        <h1>Rezepte</h1>
        <IndexLink id="add-button" className="btn btn-success" to="/recipe/add">Rezept hinzufügen</IndexLink>
        <ul id="grid" className="grid row recipe-grid">
          { this.renderRecipes() }
        </ul>
      </div>

    )
  }
  componentDidMount() {
    window.addEventListener('resize', this.positionAddButton);
    this.positionAddButton();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.positionAddButton);
  }

  positionAddButton() {
    var $this = $(ReactDOM.findDOMNode(this));
    $btn = $this.find('#add-button');
    $grid = $this.find('#grid');
    let position = $grid.offset();
    let grid_width = $grid.width();

    let left = position.left + grid_width - $btn.outerWidth(true) - 4;
    $btn.css({left: left});

  }
}

export default createContainer ( () => {
  Meteor.subscribe('recipes');
  return {
    recipes: Recipes.find({}).fetch(),
  }
}, Home);

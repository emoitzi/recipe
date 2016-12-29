import React, {Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Recipes } from '../../api/recipes.js';
import { Images } from '../../api/images.js';

class Recipe extends Component {
  render() {
    if (!this.props.recipe) {
      return false;
    }
    return (
      <div className="container">
        <h1>{ this.props.recipe.title}</h1>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src={ this.props.titleImage && this.props.titleImage.link()} className="img-responsive center-block" />
          </div>
          { !this.props.recipe.isPhotoRecipe &&
            <div className="col-xs-12 col-md-6">
              <p>
              { this.props.recipe.preparation}
              </p>
            </div>
          }
          {
            this.props.recipe.isPhotoRecipe &&
            <div className="col-xs-12">
              <img src={ this.props.recipeImage && this.props.recipeImage.link()}
                   className="img-responsive center-block" />
            </div>
          }
        </div>

      </div>

    )
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object,
  titleImage: PropTypes.object,
  recipeImage: PropTypes.object,
}

export default RecipeContainer = createContainer( (params) => {
  Meteor.subscribe("recipes");
  const recipe = Recipes.findOne({_id: params.params.id});
  let titleImage;
  let recipeImage;
  if (recipe) {
    Meteor.subscribe("images");
    if (recipe.isPhotoRecipe) {
      recipeImage = Images.findOne(recipe.recipeImage);
    }
    titleImage = Images.findOne(recipe.titleImage);
  }
  return {
    recipe: recipe,
    titleImage: titleImage,
    recipeImage: recipeImage,
  }

}, Recipe);

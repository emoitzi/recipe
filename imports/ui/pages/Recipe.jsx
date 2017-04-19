import React, {Component  } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import {browserHistory, Link} from 'react-router';

import { Recipes } from '../../api/recipes.js';
import { Images, defaultTitleImageUrl } from '../../api/images.js';
import { Categories } from '../../api/categories.js';
import Ingredients  from '../components/Ingredients'

class Recipe extends Component {
  backHandler (event) {
    event.preventDefault();
    browserHistory.push('/')
  }
  render() {
    if (!this.props.recipe) {
      return false;
    }
    return (
      <div className="container">
        <h1>{ this.props.recipe.title} <span className="label label-default">{ this.props.categoryName}</span></h1>
        {
          this.props.recipe.userId == Meteor.userId() && <Link to={this.props.location.pathname + '/edit'}>Bearbeiten</Link>
        }
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <img src={ (this.props.titleImage && this.props.titleImage.link()) || defaultTitleImageUrl()} className="img-responsive center-block" />
          </div>
          { !this.props.recipe.isPhotoRecipe &&
            <div className="col-xs-12 col-md-6">
              <h2>Zubereitung</h2>
              <pre>
              { this.props.recipe.preparation}
              </pre>
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
        {
          !this.props.recipe.isPhotoRecipe &&
          <div>
            <h2>Zutaten</h2>
            <Ingredients ingredients={ this.props.recipe.ingredients }/>
          </div>
        }
        <button className="btn btn-default pull-left" onClick={this.backHandler.bind(this)}>
          Zurück
        </button>

      </div>

    )
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object,
  titleImage: PropTypes.object,
  recipeImage: PropTypes.object,
  categoryName: PropTypes.string,
}

export default RecipeContainer = createContainer( (params) => {
  Meteor.subscribe("recipes");
  const recipe = Recipes.findOne({_id: params.params.id});
  let titleImage;
  let recipeImage;
  let category;
  if (recipe) {
    Meteor.subscribe("images");
    if (recipe.isPhotoRecipe) {
      recipeImage = Images.findOne(recipe.recipeImage);
    }
    titleImage = Images.findOne(recipe.titleImage);
    Meteor.subscribe("categories");
    category = Categories.findOne(recipe.category);
  }
  return {
    recipe: recipe,
    titleImage: titleImage,
    recipeImage: recipeImage,
    categoryName: category && category.name,
  }

}, Recipe);

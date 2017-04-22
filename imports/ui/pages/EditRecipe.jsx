import React, {Component } from 'react';
import { Meteor } from 'meteor/meteor'
import {createContainer } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import RecipeForm from './RecipeForm';
import { Recipes } from '../../api/recipes.js';
import { Images } from '../../api/images.js';

export default EditRecipe = createContainer((params) => {
  Meteor.subscribe("recipes");
  const recipe = Recipes.findOne({_id: params.params.id});
  let titleImage;
  let recipeImage;
  let category;
  let ready = false;
  if (recipe) {
    Meteor.subscribe("images");
    if (recipe.isPhotoRecipe) {
      recipeImage = Images.findOne(recipe.recipeImage);
    }
    titleImage = Images.findOne(recipe.titleImage);
    ready = true;
  }

  function handleSubmit (recipe, callback) {
    let errors;
    Meteor.call('recipes.update', recipe._id, recipe, (err) => {
      if (err) {
        errors = {};
        err.details.forEach((fieldError) => {
          errors[fieldError.name] = true;
        });
      }
      else {
        //success
        browserHistory.push('/recipe/' + recipe._id);
      }
      callback(errors);
    });
  }
  return {
    recipe:recipe,
    titlePreviewSrc: titleImage && titleImage.link(),
    recipePreviewSrc: recipeImage && recipeImage.link(),
    onSubmit: handleSubmit,
    ready: ready,
    title: "Rezept ändern",
  };

}, RecipeForm);

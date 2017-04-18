import React, {Component } from 'react';
import { Meteor } from 'meteor/meteor'
import {createContainer } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import RecipeForm from './RecipeForm';

export default AddRecipe = createContainer(() => {
  let errors = {};
  function handleSubmit (recipe) {
    errors = {};
    Meteor.call('recipes.insert', recipe, (err, id) => {
      if (err) {
        err.details.forEach((fieldError) => {
          errors[fieldError.name] = true;
        });
      }
      else {
        //success
        browserHistory.push('/recipe/' + id);
      }
    });
  }
  return {
    onSubmit: handleSubmit,
    errors: errors,
    ready: true,
  };

}, RecipeForm);

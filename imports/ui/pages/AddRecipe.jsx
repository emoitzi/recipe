import React, {Component } from 'react';
import { Meteor } from 'meteor/meteor'
import {createContainer } from 'meteor/react-meteor-data';
import {browserHistory} from 'react-router';

import RecipeForm from './RecipeForm';


export default AddRecipe = createContainer(() => {
  function handleSubmit (recipe, callback) {
    Meteor.call('recipes.insert', recipe, (err, id) => {
      let errors;
      if (err) {
        errors = {};
        err.details.forEach((fieldError) => {
          errors[fieldError.name] = true;
        });
      }
      else {
        //success
        browserHistory.push('/recipe/' + id);
      }
      callback(errors)
    });
  }
  return {
    onSubmit: handleSubmit,
    ready: true,
  };

}, RecipeForm);

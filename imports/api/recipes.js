import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Recipes = new Mongo.Collection('recipes');


IngredientSchema = new SimpleSchema({
  amount: {
    type: Number,
  },
  unit: {
    type: String,
  },
  ingredient: {
    type: String,
  }
});

Recipes.schema = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
  },
  title: {
    type: String,
  },
  ingredients: {
    type: [IngredientSchema],
    optional: true,
  },
  preparation: {
    type: String,
    optional: true,
    custom: function() {
      let shouldBeRequired = this.field('isPhotoRecipe').value == false;
      if (shouldBeRequired && (!this.isSet || this.value === null || this.value === "")) {
        return "required";
      }
    }
  },
  private: {
    type: Boolean,
    defaultValue: false,
  },
  isPhotoRecipe: {
    type: Boolean,
  },
  titleImage: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  category: {
    type: String,
  }

});


Meteor.methods({
  'recipes.insert' (fields) {
    Recipes.schema.clean(fields);
    console.log('fields: ', fields);
    if (fields.ingredients) {
      let remove_index = []
      for (let i=0; i< fields.ingredients.length; ++i) {
        let obj = fields.ingredients[i];
        if (Object.keys(obj).length === 0 && obj.constructor === Object) {
          remove_index.push(i);
        }
      }
      for (let i=0; i < remove_index.length; ++i) {
        fields.ingredients.splice(remove_index[i], 1);
      }
    }

    Recipes.schema.validate(fields);
    Recipes.insert(fields);
  }
});

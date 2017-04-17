import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

export const Recipes = new Mongo.Collection('recipes');

if (Meteor.isServer) {
  Meteor.publish('recipes', () => {
    return Recipes.find({});
  });
}

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
    regEx: SimpleSchema.RegEx.Id,
  },
  recipeImage: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
    custom: function() {
      let shouldBeRequired = this.field('isPhotoRecipe').value == true;
      if (shouldBeRequired && (!this.isSet || this.value === null || this.value === "")) {
        return "required";
      }
    }
  }
});


function cleanIngredients(fields) {
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
}

Meteor.methods({
  'recipes.insert' (fields) {
    if (! this.userId) {
      throw new Meteor.Error('recipes.not-authorized');
    }

    Recipes.schema.clean(fields);
    cleanIngredients(fields);

    fields['userId'] = this.userId;
    Recipes.schema.validate(fields);
    Recipes.insert(fields);
  }
});

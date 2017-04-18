import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema'


export const Categories = new Mongo.Collection('categories', {
  "idGeneration": "STRING"
});


IngredientSchema = new SimpleSchema({
  name: {
    type: String,
  },
});

if (Meteor.isServer) {
  Meteor.publish("categories", function(){
    return Categories.find();
  });
}

Meteor.methods({
  'categories.insert' (name) {
    const user = Meteor.user();
    if (!user || !user.isAdmin) {
      throw new Meteor.Error('categories.not-authorized');
    }
    let existing_category = Categories.findOne({name: name});
    if (existing_category) {
      throw new Meteor.Error('categories.name-conflict');
    }
    Categories.insert({name: name});
  }
});

Meteor.methods({
  'categories.remove' (categoryId) {
    const user = Meteor.user();
    if (!user || !user.isAdmin) {
      throw new Meteor.Error('categories.not-authorized');
    }
    Categories.remove(categoryId);
  }
});

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

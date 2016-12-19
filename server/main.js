import { Meteor } from 'meteor/meteor';

import { Recipes } from '../imports/api/recipes.js'

Meteor.startup(() => {
  Recipes.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  })
  // code to run on server at startup
});

import { Meteor } from 'meteor/meteor';

import { Recipes } from '../imports/api/recipes.js'
import { Images } from '../imports/api/images.js';
import { Categories } from '../imports/api/categories.js';
import '../imports/startup/accounts-config.js';


Meteor.startup(() => {
  Recipes.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
  Images.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });
  Categories.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
  });

  // code to run on server at startup
});

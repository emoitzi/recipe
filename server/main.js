import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

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

  if (Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
        username: 'admin',
        password: 'admin',
        profile: {
            first_name: '',
            last_name: '',
        }
    });
  }
  if (Categories.find().count() === 0) {
    Categories.insert({"name": "Brot"});
    Categories.insert({"name": "Mehlspeise"});
    Categories.insert({"name": "Suppe"});
  }
  // code to run on server at startup
});

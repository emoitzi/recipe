import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({'users.insert' ({username, password}) {
  const user = Meteor.user();
  if (!user || !user.isAdmin) {
    throw new Meteor.Error('users.not-authorized');
  }

  var userObject = {
    username: username,
    password: password,
  };
  Accounts.createUser(userObject);
}

})

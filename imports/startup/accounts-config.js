import { Accounts } from 'meteor/accounts-base';

let pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');

pwd.displayName = {
  default: "Passwort",
  changePwd: "Passwort",
  signIn: "Passwort",
};
pwd.placeholder = pwd.displayName;

AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "Benutzername",
      placeholder: "Benutzername",
      required: true,
      minLength: 5,
  },
  pwd,
  {
    _id: 'current_password',
    displayName: 'aktuelles Passwort',
    placeholder: 'aktuelles Passwort',
    required: true,
    type: 'password',
  },
  {
    _id: 'password_again',
    displayName: 'Passwort wiederholen',
    placeholder: 'Passwort wiederholen',
    required: true,
    type: 'password',
    minLength: 6,
  }
]);

AccountsTemplates.configure({
  forbidClientAccountCreation: true,
  enablePasswordChange: true,
  texts: {
    navSignOut: "Abmelden",
    title: {
      changePwd: "",
      signIn: "",
    },
    button: {
     changePwd: "Passwort ändern",
     signIn: "Anmelden",
   },
   info: {
     pwdChanged: "Passwort geändert",
   },
   errors: {
       loginForbidden: "Anmelden nicht möglich.",
       mustBeLoggedIn: "Du must angemeldet sein.",
       pwdMismatch: "Passwörter sind nicht gleich.",
   }
  }
});

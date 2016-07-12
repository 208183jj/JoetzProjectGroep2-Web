import { Meteor } from 'meteor/meteor';
import '../imports/api/methods.js';
import '../imports/api/rest.js';
import '../imports/api/accounts.js';
Meteor.startup(() => {
  // code to run on server at startup
  debugger;
  process.env.MAIL_URL = "smtp://postmaster%40" + 
  Meteor.settings.mailgunSMTP + ".mailgun.org:" + 
  Meteor.settings.mailgunPassword + "@smtp.mailgun.org:587";
});

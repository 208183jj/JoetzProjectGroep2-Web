import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

Meteor.startup(function(){
  Template.registerHelper('currentUser', function() {
  return Session.get('currentUser');
})
})

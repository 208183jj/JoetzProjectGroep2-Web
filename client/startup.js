import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.startup(function(){
  Template.registerHelper('currentUser', function() {
  return Session.get('currentUser');
})
})

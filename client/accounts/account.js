import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
Template.accounts.helpers({

});
Template.accounts.events({
 'click #login': function(event, template) {
   Router.go('/account/login');
 },
  'click #register': function(event, template) {
    Router.go('/account/register');
  },
  'click #resetPassword': function(event, template) {
    Router.go('/account/reset');
  },
  'click #changeAcc': function(event, template) {
    Router.go('account/change');
  }
});
Router.route('/', function(){
  this.render('accounts');
}, {
  name:"accounts"
});

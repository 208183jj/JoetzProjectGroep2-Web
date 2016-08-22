import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
Template.reset.events({
'submit form':function(event, template) {
Meteor.call('user.reset', event.target.email.value);
}
});
Template.reset.helpers({

});
Router.route('/account/reset', function(){
  this.render('reset');
}, {
  name:'reset'
});

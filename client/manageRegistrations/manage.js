import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
Template.manage.helpers({
'registrations': function() {
  return Session.get('currentCamp').attendees.pending;
}
});
Template.manage.events({
  'click input': function(event, template) {
    event.preventDefault();
    var approved = $(this).is(":checked").val();
    Meteor.call('camp.registrations', Session.get('currentUser')._id, event.target.user.id, Session.get('currentCamp')._id, "approved");
  }
});
Router.route('/manage', function(){
  this.render('manage');
}, {
  name:"manage"
});

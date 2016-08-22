import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
Template.addActivity.helpers({

});
Template.addActivity.events({
'submit form': function(event, template) {
  var u = Session.get('currentUser');
  if(u.role&&u.role==="admin")
  {
    Meteor.call('camp.add', event.target.title.value, event.target.place.value, event.target.day.value, event.target.description.value)
  }
  }
});
Router.route('/activities/add', function(){
  this.render('addActivity');
}, {
  name:"addActivity"
});

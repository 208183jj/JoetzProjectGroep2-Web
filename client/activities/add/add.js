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

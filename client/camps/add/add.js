Template.addCamp.helpers({

});
Template.addCamp.events({
  'submit form': function(event, template) {
  var u = Session.get('currentUser');
  if(u.role&&u.role==="admin")
  {
    Meteor.call('camp.add', event.target.title.value, event.target.desc.value, event.target.place.value, event.target.depTime.value, event.target.returnTime.value, event.target.price.value, event.target.minAge.value, event.target.maxAge.value, event.target.maxMembers.value, event.target.transport.value, event.target.formule.value, event.target.discounts.value, event.target.additionalInfo.value, event.target.contactInfo.value, [])
  }
  }
});
Router.route('/addCamp', function(){
  this.render('addCamp');
});

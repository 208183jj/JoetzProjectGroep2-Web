import {Blaze} from 'meteor/blaze';
import {Session} from 'meteor/session';
import {Meteor} from 'meteor/meteor';
var findCamp = function(_id){
  Meteor.call('camp.get', _id, function(err, res){
    if(!err)
      Session.set('camp', res);
  })
}
Template.camp.onRendered(function() {
  Session.set('campId', Blaze.getData('_id'));
  findCamp(Session.get('campId'));
})
Template.camp.helpers({
  'isUpcoming':function(){
    var c = Session.get('camp');
    if(c.departureTime<new Date())
      return false;
    else
      return true;
  },
  'isAdmin': function(){
    return Session.get('currentUser').role===admin;
  }
});
Template.camp.events({
  'click #subscribe': function(event, template) {
    var user = Session.get('currentUser');
    Meteor.call('camp.register', Session.get('camp')._id, user._id);
  },
  'click #manage': function(event, template) {
    Blaze.renderWithData(Template.manage, {_id: Session.get('camp')._id}, document.getElementById('management'));
  }
})
Router.route('/camps/camp', function(){
  this.render('camp');
});

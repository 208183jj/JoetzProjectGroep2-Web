import {Blaze} from 'meteor/blaze';
import {Session} from 'meteor/session';
import {Meteor} from 'meteor/meteor';
var camps = function() {
  Meteor.call('users.history.get', Session.get('currentUser')._id, function(err, res){
    if(!err)
      Session.set('camps',res);
  })
}
Template.history.onRendered(function(){
  camps();
})
Template.history.helpers({
  'camps': function() {
    return Session.get('camps');
  }
});
Template.history.events({
  'click .camp': function(event, template) {
    var view = Blaze.renderWithData(Template.camp, {_id: event.currentTarget._id}, document.getElementById('campHere'));
  }
})
Router.route('/camps/history', function(){
  this.render('history');
}, {
  name:"history"
});

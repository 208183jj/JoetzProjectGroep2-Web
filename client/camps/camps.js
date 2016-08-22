import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Blaze } from 'meteor/blaze';
var allCamps = function() {
  Meteor.call('camp.upcoming.get', function(err, res){
    if(!err)
      Session.set('upcomingCamps',res);
  })
}
Template.camps.onRendered(function(){
  allCamps();
})
Template.camps.helpers({
'camps': function() {
  Session.get('upcomingCamps');
}
});
Template.camps.events({
  'click li' : function(event, template) {
    Blaze.renderWithData(Template.camp, {_id: event.currentTarget._id}, document.getElementById('campHere'));
  },
  'click button': function(event, template) {
    Router.go('/addCamp');
  }
});
Router.route('/camps', function(){
  this.render('camps');
}, {
  name:"camps"
});

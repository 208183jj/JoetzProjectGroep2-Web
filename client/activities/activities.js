var allCamps = function() {
  Meteor.call('activities.get', function(err, res){
    if(!err)
      Session.set('upcomingActivities',res);
  })
}
Template.activities.onRendered(function(){

})
Template.activities.helpers({
  'activity': function() {
    return Session.get('upcomingActivities');
  }
});
Template.activities.events({

});

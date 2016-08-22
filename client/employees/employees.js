var getEmployees = function(){
  Meteor.call('employees.get', _id, function(err, res){
    if(!err)
      Session.set('employees', res);
  })
}
Template.employees.onRendered(function(){
  getEmployees();
})
Template.employees.helpers({
'employees': function() {
  return Session.get('employees');
}
});
Template.employees.events({
  'click li' : function(event, template) {
    Session.set('selectedEmployee',event.currentTarget._id);
    Router.go('employee');
    //TODO: get id of event-li
    //Reroute to specific employee
  }
});
Router.route('/employees', function(){
  this.render('employees');
});

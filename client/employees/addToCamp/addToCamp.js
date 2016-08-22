Template.addToCamp.onRendered(function(){
  getEmployees();
})
Template.addToCamp.helpers({
  'employees': function(){
    Session.get('employees');
  }
});
Template.addToCamp.events({
  'submit form': function(event, template) {
    _.each(template.findAll('input:checkbox[name=employee]:checked'), function(emp){
      Meteor.call('camp.employees.add', Session.get('currentUser')._id, emp.value, Session.get('camp')._id);
    });
  }
});

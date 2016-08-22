Template.employee.helpers({
  'name': function() {
    return Session.get('selectedEmployee').name;
  },
  'email': function() {
    return Session.get('selectedEmployee').email;
  },
  'tel': function() {
    return Session.get('selectedEmployee').tel;
  }
});
Router.route('/employee', function(){
  this.render('employee');
});

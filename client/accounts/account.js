Template.accounts.helpers({

});
Template.accounts.events({
 'click #login': function(event, template) {
   Router.go('/account/login');
 },
  'click #register': function(event, template) {
    Router.go('/account/register');
  },
  'click #resetPassword': function(event, template) {
    Router.go('/account/resetPassword');
  },
  'click #changeAcc': function(event, template) {
    Router.go('account/change');
  }
});
Router.route('/account', function(){
  this.render('accounts');
});

Template.login.helpers({

});
Template.login.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var login = event.target.name.value;
    var password = event.target.password.value;

    Meteor.call('user.login', login, password, function(err, res){
      if(!err)
        {
          if(res!== "Unknown combination")
          {
            Session.set('currentUser', res);
            Router.go('/camps');
          }
        }
    });
  }
})
Router.route('/account/login', function(){
  this.render('login');
});

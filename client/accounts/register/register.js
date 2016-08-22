Template.register.helpers({

});
Template.register.events({
  'submit form': function(event, template) {
    event.preventDefault();
    var e = event.target;
    var email = e.login.value;
    var password = e.password.value;
    if(email && password&&e.code.value && e.ninContact.value && e.firstNameContact.value && e.nameContact.value && e.streetContact.value && e.numberContact.value && e.cityContact.value && e.postalCodeContact.value && e.emailContact.value && e.e.telContact.value && e.ninParent.value && e.firstNameParent.value && e.nameParent.value && e.streetParent.value && e.numberParent.value && e.cityParent.value && e.ninParticipant.value && e.firstNameParticipant.value && e.nameParticipant.value && e.streetParticipant.value && e.numberParticipant.value && e.cityParticipant.value && e.telEmergency.value && e.nameEmergency.value && e.telEmergency.value) {
    var member = {
      aansluitingsnummer1: e.aan1.value,
      aansluitingsnummer2: e.aan2.value,
      code: e.code.value
    }
    var contact = {
      nationalIdentificationNumber:e.ninContact.value,
      voornaam:e.firstNameContact.value,
      naam: e.nameContact.value,
      straat: e.streetContact.value,
      huisnummerEnBus: e.numberContact.value,
      gemeente: e.cityContact.value,
      postcode: e.postalCodeContact.value,
      email: e.emailContact.value,
      telefoon: e.telContact.value
    }
    var parent = {
      nationalIdentificationNumber:e.ninParent.value,
      voornaam:e.firstNameParent.value,
      naam: e.nameParent.value,
      straat: e.streetParent.value,
      huisnummerEnBus: e.numberParent.value,
      gemeente: e.cityParent.value,
      postcode: e.postalCodeParent.value,
      email: e.emailParent.value,
      telefoon: e.telParent.value
    }
    var participant = {
      nationalIdentificationNumber:e.ninParticipant.value,
      voornaam:e.firstNameParticipant.value,
      naam: e.nameParticipant.value,
      straat: e.streetParticipant.value,
      huisnummerEnBus: e.numberParticipant.value,
      gemeente: e.cityParticipant.value,
      postcode: e.postalCodeParticipant.value,
      email: e.emailParticipant.value,
      telefoon: e.telParticipant.value
    }
    var emergencyContact = {
      voornaam:e.firstNameEmergency.value,
      naam:e.nameEmergency.value,
      telefoon:e.telEmergency.value
    }
    var additionalInfo = e.additionalInfo.value;
  Meteor.call('participant.register', email, password, member, contact, parent, participant, emergencyContact, additionalInfo);
  }
    template.find('form').reset();
  }
});
Router.route('/account/register', function(){
  this.render('register');
});

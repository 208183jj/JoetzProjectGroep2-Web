AccountsTemplates.configure({
    confirmPassword: true,
  enablePasswordChange: true,
  enforceEmailVerification: false, //mag enkel true zijn als er geen sociale logins zijn
  sendVerificationEmail: true,
  focusFirstInput: true,
  overrideLoginErrors: false, //Should 'login forbidden be shown', or 'wrong email'/'wrong password'?
  socialLoginStyle: "popup",
  showAddRemoveServices: true,
  showForgotPasswordLink: true,
  showLabels: true,
  showPlaceholders: true,
  showResendVerificationEmailLink: true,
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,
  homeRoutePath: '/',
  //privacyUrl: 'PathToTemplateForPrivacyInformation',
  //termsUrl: 'PathToTemplateWithTermsAndConditions',
});
if(Meteor.isServer) {
    Accounts.onCreateUser(function(option, user) {
        //check all required fields
    });
Accounts.emailTemplates = {
  from: "Joetz <no-reply@joetz.be>",
  siteName: "joetz.be",
  resetPassword: {
    subject: function (user) {
      return "password reset";
    },
    text: function (user, url) {
      return "Beste, \n Er werd recent een aanvraag gestuurd voor een nieuw paswoord voor jouw account. \n Om dit in te stellen, moet je op de onderstaande link klikken. \n\n"+
      url + "\n\n Indien jij niet gevraagd hebt voor dit nieuwe paswoord, gelieve deze mail dan gewoon te negeren. \n\n Groetjes \n Joetz";
    }
  },
  verifyEmail: {
    subject: function (user) {
      return "Verify Email";
    },
    text: function (user, url) {
       return "Beste,\n\n Bedankt voor je registratie \n Bevestig snel je e-mailadres zodat je kan starten met het zoeken naar een leuk kamp! \n\n" + 
       url + "\n\n Groetjes, \n Joetz";
    }
  },
};
}
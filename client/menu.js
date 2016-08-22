import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
Template.menu.rendered = function () {
  $(".button-collapse").sideNav();
};

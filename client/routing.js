import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound'
});

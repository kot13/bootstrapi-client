import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('recovery-password');
  this.route('reset-password');
  this.route('activate');
  this.route('profile');
  this.route('logs');
  this.route('not-found', {path: '*path'});
});

export default Router;

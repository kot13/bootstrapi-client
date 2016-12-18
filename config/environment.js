/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'bootstrapi-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
      }
    },

    APP: {
      apiHost: ''
    }
  };

  if (environment === 'development') {
    ENV.APP.apiHost = 'http://bootstrapi.demostage.ru';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.APP.apiHost = 'http://bootstrapi.demostage.ru';
  }

  return ENV;
};

import Ember from 'ember';
import AjaxService from 'ember-ajax/services/ajax';
import ENV from '../config/environment';

export default AjaxService.extend({
    session: Ember.inject.service(),
    headers: Ember.computed('session.authToken', {
        get() {
            let headers = {};
            const authToken = this.get('session.data.authenticated.access_token');

            if (authToken) {
                headers['authorization'] = 'Bearer ' + authToken;
            }
            return headers;
        }
    }),
    namespace: '/api',
    host: ENV.APP.apiHost
});
import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import Ember from 'ember';
import ENV from '../config/environment';

const { RSVP, isEmpty, run } = Ember;
const assign = Ember.assign || Ember.merge;

export default OAuth2PasswordGrant.extend({
    serverTokenEndpoint: ENV.APP.apiHost + '/api/token',

    authenticate: function (identification, password, scope = []) {
        return new RSVP.Promise((resolve, reject) => {
            const data = {
                'data': {
                    'attributes': {
                        'username': identification,
                        'password': password
                    }
                }
            };

            const serverTokenEndpoint = this.get('serverTokenEndpoint');
            const scopesString = Ember.makeArray(scope).join(' ');
            if (!Ember.isEmpty(scopesString)) {
                data.scope = scopesString;
            }
            this.makeRequest(serverTokenEndpoint, data).then((response) => {
                run(() => {
                    const expiresAt = this._absolutizeExpirationTime(response['expires_in']);
                    this._scheduleAccessTokenRefresh(response['expires_in'], expiresAt, response['refresh_token']);
                    if (!isEmpty(expiresAt)) {
                        response = assign(response, { 'expires_at': expiresAt });
                    }
                    resolve(response);
                });
            }, (xhr) => {
                run(null, reject, xhr.responseJSON || xhr.responseText);
            });
        });
    },

    makeRequest(url, data) {
        const options = {
            url,
            data,
            type:        'POST',
            dataType:    'json',
            contentType: 'application/x-www-form-urlencoded'
        };

        const clientIdHeader = this.get('_clientIdHeader');
        if (!isEmpty(clientIdHeader)) {
            options.headers = clientIdHeader;
        }

        return Ember.$.ajax(options);
    }
});
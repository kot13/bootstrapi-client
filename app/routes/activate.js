import Ember from 'ember';

export default Ember.Route.extend({

    session: Ember.inject.service(),

    ajax: Ember.inject.service(),

    beforeModel() {
        if (this.get('session').get('currentUser')) {
            this.transitionTo('index');
        }
    },

    model() {
        this._super(...arguments);
        let token = arguments[1].queryParams.token;

        let data = {
            "data": {
                "attributes": {
                    "token": token
                }
            }
        };

        return this.get('ajax').request('/user/activate', {
            method: 'POST',
            data: data
        }).then(() => {
            this.transitionTo('login');
        }).catch(() => {
            this.transitionTo('login');
        });
    }
});

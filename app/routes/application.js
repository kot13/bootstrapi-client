import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    session: Ember.inject.service(),

    model() {
        this._super(...arguments);

        let session = this.get('session');
        let userId = session.get('data.authenticated.user.id');

        return new Ember.RSVP.Promise((resolve) => {

            Ember.RSVP.hash({

                currentUser: (userId) ? this.store.findRecord('user', userId, {
                    include: 'role,role.rights'
                }) : null

            }).then((model) => {
                let session = this.get('session');
                session.set('currentUser', model.currentUser);

                resolve(model);
            });
        });
    },

    setupController(controller) {
        this._super(...arguments);
        let session = this.get('session');

        controller.set('user', Ember.computed('session.currentUser.id', function(){
            return session.get('currentUser');
        }));
    },

    actions: {
        sessionChanged: function () {
            this.refresh();
        }
    }

});
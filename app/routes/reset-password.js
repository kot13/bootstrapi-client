import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

    session: Ember.inject.service(),

    beforeModel() {
        if (this.get('session').get('currentUser')) {
            this.transitionTo('index');
        }
    },

    model() {
        this._super(...arguments);
        return {
            token: arguments[1].queryParams.token
        };
    },

    actions: {
        routeToLogin() {
            this.transitionTo('login');
        }
    },

    renderTemplate: function() {
        this.render("reset-password", {
            outlet: "login",
            into: "application"
        });
    }
});

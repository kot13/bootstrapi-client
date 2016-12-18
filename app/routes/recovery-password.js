import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {

    session: Ember.inject.service(),

    beforeModel() {
        if (this.get('session').get('currentUser')) {
            this.transitionTo('index');
        }
    },

    renderTemplate: function() {
        this.render("recovery-password", {
            outlet: "login",
            into: "application"
        });
    }
});

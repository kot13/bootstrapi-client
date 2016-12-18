import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
    renderTemplate: function() {
        this.render("login", {
            outlet: "login",
            into: "application"
        });
    }
});

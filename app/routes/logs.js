import Ember from 'ember';
import { CanMixin } from 'ember-can';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(CanMixin, AuthenticatedRouteMixin, {

    session: Ember.inject.service(),

    model(params) {
        let sort = [
            {
                attribute: "created_at",
                direction: "desc",
            }
        ];

        return new Ember.RSVP.Promise((resolve) => {
            Ember.RSVP.hash({
                currentUser: this.get('session.currentUser'),
                logs: this.get('store').query('log', {
                    sort: JSON.stringify(sort),
                    page: {
                        number: params.page,
                        size: params.size
                    }
                })
            }).then((model) => {
                Ember.RSVP.hash({
                    meta: model.logs.get('meta'),
                }).then((second) => {
                    model.meta = second.meta;

                    resolve(model);
                });
            });
        });
    },

    queryParams: {
        page: {
            refreshModel: true
        },
        size: {
            refreshModel: true
        }
    }
});

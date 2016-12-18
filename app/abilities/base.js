import Ember from 'ember';
import { Ability } from 'ember-can';

export default Ability.extend({
    session: Ember.inject.service(),
    store: Ember.inject.service(),

    rights: Ember.computed('session.currentUser.id', function() {

        let rightsArray = [],
            rights = this.get('session.currentUser.role.rights');

        if (rights) {
            rights.map((right) => {
                rightsArray.push(right.get('name'));
            });
        }

        return rightsArray;
    })
});
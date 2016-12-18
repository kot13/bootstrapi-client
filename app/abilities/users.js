import Ember from 'ember';
import Base from './base';

export default Base.extend({
    canManage: Ember.computed('rights', function() {
        return this.get('rights').indexOf('manageUsers') > -1;
    })
});
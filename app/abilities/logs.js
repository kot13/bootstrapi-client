import Ember from 'ember';
import Base from './base';

export default Base.extend({
    canBrowse: Ember.computed('rights', function() {
        return this.get('rights').indexOf('browseLogs') > -1;
    })
});
import Ember from 'ember';

export default Ember.Controller.extend({

    queryParams: [
        'page',
        'size'
    ],

    page: 1,

    size: 20,

    notify: Ember.inject.service(),

    session: Ember.inject.service(),

    logsSortOptions: ['id:desc'],

    logs: Ember.computed.sort('model.logs', 'logsSortOptions'),

});
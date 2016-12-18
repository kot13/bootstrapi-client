import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
    keyForAttribute: function(attr) {
        return Ember.String.underscore(attr);
    },

    keyForRelationship: function(attr) {
        return Ember.String.underscore(attr);
    },

    normalizeQueryResponse(store, clazz, payload) {
        const result = this._super(...arguments);
        result.meta = result.meta || {};

        if (payload.links) {
            result.meta.pagination = this.createPageMeta(payload.links);
        }

        return result;
    },

    createPageMeta(data) {
        let meta = {};

        Object.keys(data).forEach(type => {
            const link = data[type];
            meta[type] = {};
            let a = document.createElement('a');
            a.href = link;

            a.search.slice(1).split('&').forEach(pairs => {
                const [param, value] = pairs.split('=');

                if (param === 'page[number]') {
                    meta[type].number = parseInt(value);
                }
                if (param === 'page[size]') {
                    meta[type].size = parseInt(value);
                }

            });
            a = null;
        });

        return meta;
    }
});
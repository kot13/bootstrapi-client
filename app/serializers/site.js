import application from './application';

export default application.extend({
    extractAttributes(modelClass, resourceHash) {
        let attr = resourceHash.attributes;
        let attributes = {
            ownerId: attr.owner_id,
            host: attr.host,
            key: attr.key,
            timetable: JSON.parse(attr.timetable),
            countries: JSON.parse(attr.countries),
            status: attr.status,
            deletedAt: attr.deleted_at
        };

        return attributes;
    },

    serialize () {
        let toJSON = this._super(...arguments);
        let attributes = toJSON.data.attributes;

        toJSON.data.attributes =  {
            owner_id: attributes.owner_id,
            host: attributes.host,
            key: attributes.key,
            timetable: JSON.stringify(attributes.timetable),
            countries: JSON.stringify(attributes.countries),
            status: attributes.status,
            deleted_at: attributes.deleted_at
        };

        return toJSON;
    }
});
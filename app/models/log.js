import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasOne } from 'ember-data/relationships';

export default Model.extend({
    action: attr('string'),
    entityId: attr('number'),
    entityType: attr('string'),
    state: attr('string'),
    createdAt: attr('date'),
    createdBy: attr('number'),
    // user: hasOne('user', {
    //     inverse: null
    // })
});

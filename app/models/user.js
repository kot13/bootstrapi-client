import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
    role: belongsTo('role'),
    domain: belongsTo('domain'),
    roleId: attr('number'),
    domainId: attr('number'),
    balance: attr('string'),
    email: attr('string'),
    password: attr('string'),
    status: attr('number'),
    fullName: attr('string'),
    deletedAt: attr('date')
});

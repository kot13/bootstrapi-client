import Ember from 'ember';

export default Ember.Component.extend({

    notify: Ember.inject.service(),

    ajax: Ember.inject.service(),

    actions: {
        recovery() {
            let prop = this.getProperties('email');

            if (!prop.email || !prop.email.trim()) {
                this.set('errorMessage', 'Не введен email');
                return;
            }

            let data = {
                "data": {
                    "attributes": {
                        "email": prop.email
                    }
                }
            };

            return this.get('ajax').request('/user/request-password-reset', {
                method: 'POST',
                data: data
            }).then(() => {
                this.get('notify').success('Запрос отправлен успешно. Проверьте ваш почтовый ящик.');
                prop.email = '';
            }).catch((error) => {
                this.get('notify').error('Ошибка отправки запроса. Проверьте правильность почтового ящика.');
                throw error;
            });
        }
    }
});
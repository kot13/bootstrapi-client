import Ember from 'ember';

export default Ember.Component.extend({

    notify: Ember.inject.service(),

    ajax: Ember.inject.service(),

    actions: {
        reset(token) {
            let {password, password_repeat} = this.getProperties('password', 'password_repeat');

            if (!password || !password.trim()) {
                this.set('errorMessage', 'Не введен пароль');
                return;
            }
            if (!password_repeat || !password_repeat.trim()) {
                this.set('errorMessage', 'Не введен пароль повторно');
                return;
            }
            if (password !== password_repeat) {
                this.set('errorMessage', 'Пароли не совпадают');
                return;
            }

            let data = {
                "data": {
                    "attributes": {
                        "token": token,
                        "password": password
                    }
                }
            };

            return this.get('ajax').request('/user/reset-password', {
                method: 'POST',
                data: data
            }).then(() => {
                this.get('notify').success('Запрос отправлен успешно. Проверьте ваш почтовый ящик..');
                this.sendAction('reset');
            }).catch((error) => {
                this.get('notify').error('Ошибка отправки запроса. Срок действия токена истёк.');
                throw error;
            });
        }
    }
});
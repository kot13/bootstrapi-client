import Ember from 'ember';

export default Ember.Component.extend({
    session: Ember.inject.service(),

    store: Ember.inject.service(),

    actions: {
        authenticate(){
            let {identification, password} = this.getProperties('identification', 'password');

            if (!identification || !identification.trim()) {
                this.set('errorMessage', 'Не введен email');
                return;
            }

            if (!password || !password.trim()) {
                this.set('errorMessage', 'Не введен пароль');
                return;
            }

            this.get('session').authenticate('authenticator:oauth2', identification, password)
                .then(() => {
                    let session =  this.get('session'),
                        userId = session.get('data.authenticated.user.id');

                    if (userId) {
                        this.get('store').findRecord('user', userId, {
                            include: 'role,role.rights'
                        }).then((user) => {
                            session.set('currentUser', user);
                        });
                    }

                }).catch((reason) => {
                if (reason.errors && reason.errors[0].status === '400') {
                    this.set('errorMessage', "Неверный email или пароль");
                }
            });
        }
    }
});
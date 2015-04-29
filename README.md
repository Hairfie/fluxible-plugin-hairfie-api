Fluxible Hairfie API Plugin
===========================

Install
-------

    npm install --save fluxible-plugin-hairfie-api

```javascript

import hairfieApiPlugin from 'fluxible-plugin-hairfie-api';

app.plug(hairfieApiPlugin({
    apiUrl: process.env.HAIRFIE_API_URL
}));

```

Action Context
--------------

```javascript

function loadUser(context, { userId }) {
    return context.hairfieApi
        .get(`/users/${userId}`)
        .then(user => context.dispatch('RECEIVE_USER', user));
}

```

Store Context
-------------

```javascript

import BaseStore from 'fluxible/addons/BaseStore';

class UserStore extends BaseStore {

    static handlers = {
        RECEIVE_USER: 'onReceiveUser'
    }

    constructor(dispatcher) {
        super(dispatcher);

        this.users = {};
    }

    onReceiveUser(user) {
        this.users[user.id] = user;
    }

    getById(id) {
        const user = this.users[id];

        if (!user) {
            this.getContext().hairfieApi.get(`/users/${userId}`).then(user => {
                this.getContext().dispatch('RECEIVE_USER', user);
            });
        }

        return user;
    }

}

```

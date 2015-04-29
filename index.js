'use strict';

var Client = require('./client');

function hairfieApiPlugin(options) {
    var options = options;

    return {
        name: 'HairfieApiPlugin',
        plugContext: function () {
            var client = new Client(options);

            return {
                plugActionContext: function (actionContext) {
                    actionContext.hairfieApi = client;
                },
                plugStoreContext: function (storeContext) {
                    storeContext.hairfieApi = client;
                }
            };
        },
        dehydrate: function () {
            return { options: options };
        },
        rehydrate: function (state) {
            options = state.options;
        }
    };
}

module.exports = hairfieApiPlugin;

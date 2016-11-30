'use strict';

exports.register = function (server, options, next) {
    server.app.models = {
        UserModel: require('./UserModel')
    };

    next();
}

exports.register.attributes = {
    name: 'example'
};
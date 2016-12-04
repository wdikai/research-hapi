'use strict';

let path = require('path');

const FRONTEND_PATH = path.join(__dirname, '../..', 'frontend/admin')

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/admin/{param*}',
        handler: {
            directory: {
                path: FRONTEND_PATH,
                listing: true
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'static'
};
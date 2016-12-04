'use strict';

let Joi = require('joi');

let AuthController = require('../../controllers/AuthController');
let userValidators = require('../../validators/userValidators');

exports.register = function (server, options, next) {

    let UserModel = server.app.models.UserModel;
    let JWT_SECRET = server.app.JWT_SECRET;
    server.route({
        method: 'POST',
        path: '/api/auth/local',
        handler: function (request, reply) {
            var controller = new AuthController(UserModel, JWT_SECRET);
            controller.local(request, reply);
        },
        config: {
            validate: {
                payload: userValidators.userCredentials
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'auth-api'
};
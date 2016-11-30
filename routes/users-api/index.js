'use strict';

let Joi = require('joi');

let UsersController = require('../../controllers/UsersController');

exports.register = function (server, options, next) {

    let db = server.app.db;

    server.route({
        method: 'GET',
        path: '/users',
        handler: function (request, reply) {
            var controller = new UsersController(server.app.models.UserModel);
            controller.getUsers(request, reply);
        },
        config: {
            auth: 'jwt'
        }
    });


    server.route({
        method: 'GET',
        path: '/users/{id}',
        handler: function (request, reply) {
            var controller = new UsersController(server.app.models.UserModel);
            controller.getUser(request, reply);
        }
    });

    server.route({
        method: 'POST',
        path: '/users',
        handler: function (request, reply) {
            var controller = new UsersController(server.app.models.UserModel);
            controller.create(request, reply);
        },
        config: {
            auth: 'jwt',
            validate: {
                payload: {
                    email: Joi.string().min(10).max(50).required(),
                    password: Joi.string().min(6).max(50).required()
                }
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'users-api'
};
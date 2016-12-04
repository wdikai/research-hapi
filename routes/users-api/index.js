'use strict';

let Joi = require('joi');

let UsersController = require('../../controllers/UsersController');

exports.register = function (server, options, next) {

    let db = server.app.db;
    let apiUrl = '/api/users'

    server.route({
        method: 'GET',
        path: apiUrl,
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
        path: `${apiUrl}/{id}`,
        handler: function (request, reply) {
            var controller = new UsersController(server.app.models.UserModel);
            controller.getUser(request, reply);
        }
    });

    server.route({
        method: 'POST',
        path: apiUrl,
        handler: function (request, reply) {
            var controller = new UsersController(server.app.models.UserModel);
            controller.create(request, reply);
        },
        config: {
            auth: 'jwt',
            validate: {
                payload: userValidators.userBody
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'users-api'
};
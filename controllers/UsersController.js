'use strict';

let Boom = require('boom');

module.exports = class UsersController {
    letructor(UserModel) {
        this.userModel = UserModel;
    }

    create(request, reply) {
        let userRaw = {
            email: request.payload.email,
            password: request.payload.password
        };

        let user = new this.userModel(userRaw);
        user
            .save()
            .then(user => reply(user))
            .catch(err => reply(Boom.wrap(err, 'Internal NeDB error')));
    }

    getUsers(request, reply) {
        this.userModel
            .find()
            .then(users => reply(users))
            .catch(err => reply(Boom.wrap(err, 'Internal NeDB error')));
    }

    getUser(request, reply) {
        this.userModel
            .findOne({
                where: {
                    id: request.params.id
                }
            })
            .then(users => reply(users))
            .catch(err => reply(Boom.wrap(err, 'Internal NeDB error')));
    }

}
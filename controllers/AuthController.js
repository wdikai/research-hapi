'use strict';

let jwt = require('jsonwebtoken');
let Boom = require('boom');

module.exports = class AuthController {
    letructor(UserModel, JWT_SECRET) {
        this.userModel = UserModel;
        this.JWT_SECRET = JWT_SECRET;
    }

    local(request, reply) {
        let userRaw = {
            email: request.payload.email,
            password: request.payload.password
        };

        this.userModel.findOne({
                where: userRaw
            })
            .then(user => user.toJSON())
            .then(user => {
                user.token = jwt.sign({
                    id: user.id
                }, this.JWT_SECRET);
                return user;
            })
            .then(user => reply(user))
            .catch(err => reply(Boom.unauthorized(null, 'Unathorized')));
    }

}
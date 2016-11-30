'use strict';

let jwt = require('jsonwebtoken');
let Boom = require('boom');

exports.register = function (server, options, next) {
    server.app.JWT_SECRET = 'secret';
    server.auth.scheme('jwt', scheme);
server.auth.strategy('jwt', 'jwt');

    function scheme(server, options) {
        let UserModel = server.app.models.UserModel;
        let JWT_SECRET = server.app.JWT_SECRET;

        return {
            authenticate: function (request, reply) {
                let req = request.raw.req;
                if (!req.headers.authorization) {
                    return reply(Boom.unauthorized(null));
                }
                let authorization = req.headers.authorization;
                let [
                    strategy,
                    tokenString
                ] = authorization.split(' ');

                if (!strategy || strategy.trim() !== 'Bearer') {
                    return reply(Boom.unauthorized(null));
                }

                Promise.resolve()
                    .then(() => {
                        return jwt.verify(tokenString, JWT_SECRET);
                    })
                    .then(token => {
                        if (!token || !token.id) {
                            return reply(Boom.unauthorized(null));
                        }

                        return UserModel.findOne({
                            where: {
                                id: token.id
                            }
                        });
                    })
                    .then((user) => {
                        reply.continue({
                            credentials: {
                                user: user
                            }
                        })
                    })
                    .catch(err => reply(Boom.unauthorized(err)));
            }
        };
    }

    return next();
};

exports.register.attributes = {
    name: 'auth-jwt'
};
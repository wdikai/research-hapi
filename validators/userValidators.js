'use strict';

let Joi = require('joi');

module.expots = {
    userCredentials: {
        email: Joi.string().min(10).max(50).email().required(),
        password: Joi.string().min(6).max(50).required()
    },
    userBody: {
        email: Joi.string().min(10).max(50).email().required(),
        password: Joi.string().min(6).max(50).required(),
        name: Joi.string().min(5).max(50)
    }
}
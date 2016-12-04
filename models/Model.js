'use strict';

let uuid = require('uuid');

module.exports = class Model {
    constructor() {
        this._data = {};
    }
    
    toJSON() {
        return this._data;
    }

    $save(model, instance) {
        let data = instance.toJSON();
        if (!data.id) {
            data.id = uuid.v4();
            return new Promise((resolve, reject) => {
                model.insert(data, (err, data) => {
                    if (err) return reject(err);

                    resolve(data);
                });
            });
        }

        return new Promise((resolve, reject) => {
            model.update({
                id: this.id
            }, data, (err, data) => {
                if (err) return reject(err);

                resolve(data);
            });
        });
    }

    static $find(model, options = {
        where: {},
        attribures: {}
    }) {
        return new Promise((resolve, reject) => {
            model.find(options.where, options.attribures, (err, data) => {
                if (err) return reject(err);

                resolve(data);
            })
        });
    }

    static $findOne(model, options = {
        where: {},
        attribures: {}
    }) {
        return new Promise((resolve, reject) => {
            model
                .findOne(options.where)
                .projection(options.attribures)
                .exec((err, data) => {
                    if (err) return reject(err);

                    resolve(data);
                })
        })
    }

    static $count(model, options = {
        where: {}
    }) {
        return new Promise((resolve, reject) => {
            model.count(options.where, (err, data) => {
                if (err) return reject(err);

                resolve(data);
            })
        })
    }

    static $destroy(model, options = {
        where: {},
        options: {}
    }) {
        return new Promise((reject, resolve) => model.remove(options.where, options.options, err => err ? reject(err) : resolve()));
    }
}
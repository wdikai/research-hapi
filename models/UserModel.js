'use strict';

let Datastore = require('nedb');
let path = require('path');

let Model = require('./Model');

var users = new Datastore({
    filename: path.join(__dirname, './db/users.db'),
    autoload: true
});

module.exports = class UserModel extends Model {
    constructor(data = {}) {
        super();
        if (!data.email) throw new Error('Email is required');
        if (!data.password) throw new Error('Password is required');

        this._data = {};

        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
    }

    get id() {
        return this._data.id;
    }
    set id(value) {
        this._data.id = value;
    }

    get email() {
        return this._data.email;
    }
    set email(value) {
        this._data.email = value;
    }

    get password() {
        return this._data.password;
    }
    set password(value) {
        this._data.password = value;
    }

    /**
     * Save user
     * @return {Promise}
     */
    save() {
        return super
            .$save(users, this._data)
            .then(data => new UserModel(data));
    }

    toJSON() {
        return this._data;
    }

    static find(options = {
        where: {},
        attribures: {}
    }) {
        return super
            .$find(users, options)
            .then(users => users.map(user => new UserModel(user)));
    }

    static findOne(options = {
        where: {},
        attribures: {}
    }) {
        return super
            .$findOne(users, options)
            .then(user => user ? new UserModel(user) : null);
    }

    static count(options = {
        where: {}
    }) {
        return super.$count(users, options);
    }
}
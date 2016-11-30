'use strict';

let Hapi = require('hapi');

// Create a server with a host and port
let server = new Hapi.Server();
server.connection({
    port: 3001
});

// Add the route
server.register([{
    register: require('./models')
}, {
    register: require('./auth/jwtAuth')
}, {
    register: require('./routes/auth-api')
},{
    register: require('./routes/users-api')
}], function () {
    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
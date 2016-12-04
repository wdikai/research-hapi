'use strict';

let Hapi = require('hapi');

// Create a server with a host and port
let server = new Hapi.Server();
server.connection({
    port: 3001
});

// Add the route
server.register([
    require('inert'),
    require('./models'),
    require('./auth/jwtAuth'),
    require('./routes/static'),
    require('./routes/auth-api'),
    require('./routes/users-api')
], function () {
    server.start((err) => {
        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});
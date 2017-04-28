'use strict';

// Server setup

const Hapi = require('hapi'),
    Good = require('good'),
    Inert = require('inert'),
    Path = require('path');

let server = new Hapi.Server(),
    registerOptions = [{
            register: Inert,
            options: {}
        }, {
            register: Good,
            options: {
                reporters: {
                    console: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{
                            response: '*',
                            log: '*'
                        }]
                    }, {
                        module: 'good-console'
                    }, 'stdout']
                }
            }
        }
    ];

server.connection({
    host: 'localhost',
    port: parseInt(process.env.PORT) || 8000
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        let uri = Path.join(__dirname, 'src/client/index.html');

        reply.file(uri);
    }
});

server.route({
    method: 'GET',
    path: '/{pathToFile*}',
    handler: (request, reply) => {
        let uri = Path.join(__dirname, request.params.pathToFile);

        reply.file(uri);
    }
});

server.register(registerOptions, (err) => {

    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }

        server.log('info', 'Server running at: ' + server.info.uri);
    });
});

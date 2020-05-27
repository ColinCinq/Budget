var twig = require('twig'),
    server = require('./lib/server'),
    db = require('./lib/db'),
    handler = require('./lib/handler')(db);

require('./lib/router')(server, handler);

console.log( app.settings.port )
app.listen( app.settings.port ) 
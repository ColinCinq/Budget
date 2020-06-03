var server = require('./lib/server'),
	db = require('./lib/db'),
	handler = require('./lib/handler')(db);

require('./lib/router')(server, handler)

console.log( server.settings.port )
server.listen( server.settings.port ) 
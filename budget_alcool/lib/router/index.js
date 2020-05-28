module.exports = function (server, handler) {

	server.get('/', handler.autentification.requiresLogin, handler.renderIndex)
	require('./autentification')(server, handler)

	server.get('*', handler.render404)

}

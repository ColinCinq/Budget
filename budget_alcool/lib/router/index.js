module.exports = function (server, handler) {

	server.get('/', handler.autentification.requiresLogin, handler.renderIndex)
	require('./autentification')(server, handler)
	// require('./alcohol')(server, handler)
	// require('./cocktail')(server, handler)

	server.get('*', handler.render404)

}

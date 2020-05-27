module.exports = function (server, handler) {
	
	server.get('/', handler.renderIndex)
	require('./autentification')(server, handler)

	app.get('*', handler.render404)

}

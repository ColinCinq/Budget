module.exports = function (server, handler) {
	
	server.get('/login', handler.autentification.requiresLogin, handler.cocktail.renderLogin)

}

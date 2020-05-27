module.exports = function (server, handler) {
	
	server.get('/', handler.renderIndex)
	server.get('/login', handler.renderLogin)
	server.get('/signup', handler.renderSignUp)
	server.get('/login/ajax', handler.ajaxLogin)
	server.get('/signup/ajax', handler.ajaxSignUp)

}

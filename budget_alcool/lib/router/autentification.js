module.exports = function (server, handler) {
	
	server.get('/login', handler.autentification.renderLogin)
	server.get('/signup', handler.autentification.renderSignUp)
	server.post('/login/ajax', handler.autentification.ajaxLogin)
	server.post('/signup/ajax', handler.autentification.ajaxSignUp)
	server.get('/logout',handler.autentification.renderLogOut)

}

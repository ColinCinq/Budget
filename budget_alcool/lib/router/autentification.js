module.exports = function (server, handler) {
	
	server.get('/login', handler.renderLogin)
	server.get('/signup', handler.renderSignUp)
	server.post('/login/ajax', handler.ajaxLogin)
	server.post('/signup/ajax', handler.ajaxSignUp)
	server.get('/logout',handler.renderLogOut)

}

module.exports = function (db) {

	return {
		requiresLogin: function (req, res, next) {
			console.log(req.session)
			if (req.session && req.session.loggedin)
				next()	
			else
				res.redirect('/login')
		}
	}
}
module.exports = function (db) {

	return {
		requiresLogin: function (req, res, next) {
			if (req.session && req.session.loggedin) {
				next()	
			} else {
				res.redirect('/login')
				res.end()
			}
		},

		renderLogin: function (req, res) {
			res.render("autentification/login.html.twig")
		},
		ajaxLogin: function (req,res) {
			let username = req.body.username
			let password = req.body.password
			if (username && password) {
				db.Users.login(username, password, function (err, result) {
					if (result == false){
						res.send({errorLog: 'identifiant ou mot de passe incorrect'})
					} else {
						req.session.loggedin = true
						req.session.username = result
						res.redirect('/')
						res.end()
					}
				})
			} else {
				res.send({errorLog:'Please enter Username and Password!'})
			}
		},

		renderSignUp: function (req, res) {
			res.render("autentification/signUp.html.twig")
		},
		ajaxSignUp: function (req,res) {
			db.Users.isAlreadyExisting(req.body.username, req.body.email, function (err, result) {

				let msgErrorLog = ""
				if (result.username)
					msgErrorLog += "Nom d'utilisateur deja utilisé"
				if (result.email)
					msgErrorLog += "Email deja utilisé"

				if (msgErrorLog != ""){
					res.send({errorLog : msgErrorLog})
					res.end()
				} else {
					db.Users.register(req.body.username, req.body.password, req.body.email, function (err, result) {
						if (result){
							res.redirect('/login')
							res.end()
						} else
							res.send({errorLog: err})
					})
				}
			})
		},

		renderLogOut: function (req, res) {
			//TODO suppr cookie
			res.render("autentification/logout.html.twig")
		}
	}
}
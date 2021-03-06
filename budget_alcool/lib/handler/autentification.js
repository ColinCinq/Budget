module.exports = function (db) {

	return {
		requiresLogin: function (req, res, next) {
			if (req.session && req.session.loggedin)
				next()	
			else
				res.redirect('/login')
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
						res.send({result: "error", errorLog: 'identifiant ou mot de passe incorrect'})
					} else {
						req.session.loggedin = true
						req.session.username = result
						res.send({result: "success"})
						res.end()
					}
				})
			} else {
				res.send({result: "error", errorLog:"Merci d'entrer un identifiant et un mot de passe!"})
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
				if (msgErrorLog != "")
					msgErrorLog += '<br>'
				if (result.email)
					msgErrorLog += "Email deja utilisé"

				if (msgErrorLog != ""){
					res.send({result: "error", errorLog : msgErrorLog})
					res.end()
				} else {
					db.Users.register(req.body.username, req.body.password, req.body.email, function (err, result) {
						if (result){
							res.send({result: "success", msg: "Utilisateur créé avec succès"})
							res.end()
						} else{
							res.send({result: "error", errorLog: err})
							res.end()
						}
					})
				}
			})
		},

		renderLogOut: function (req, res) {
			req.session.destroy()
			res.render("autentification/logOut.html.twig")
		},

		forgotPassword: function (req, res) {
			res.render("autentification/forgotPassword.html.twig")
		}
	}
}
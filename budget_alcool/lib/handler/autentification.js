module.exports = (db) => {

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
				let ret = db.Users.login(username, password)
				console.log(ret)
				if (ret == false)
					res.send({error: "identifiant ou mot de passe incorrect"})
				else {
					req.session.loggedin = true
					req.session.username = ret
					res.redirect('/')
					res.end()
				}
			} else {
				res.send('Please enter Username and Password!')
				res.end()
			}
		},

		renderSignUp: function (req, res) {
			res.render("autentification/signUp.html.twig")
		},
		ajaxSignUp: function (req,res) {
			if(db.Users.isAlreadyExisting(req.body.username)){
				res.send({error: "Nom d'utilisateur deja utilisé"})
			} else {
				if(db.Users.register(req.body.username, req.body.password)){
					res.rediect('/login').send({sucess: "Utilisateur créé avec succès"})
				}
			}
			res.end()
		},

		renderLogOut: function (req, res) {
			//TODO suppr cookie
			res.render("autentification/logout.html.twig")
		}
	}
}
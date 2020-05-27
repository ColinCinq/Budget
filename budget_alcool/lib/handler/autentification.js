module.exports = function (db) {

	return {
		renderLogin: (req, res) => {
			res.render("login.twig")
		},
		ajaxLogin: (req,res) => {
			let ret = bd.Users.login(req.body.username, req.body.password)
			if (!ret)
				res.send({error: "identifiant ou mot de passe incorrect"})
			else {
				// TODO cookie
				res.send({redirect: '/'})
			}
		},

		renderSignUp: (req, res) => {
			res.render("signUp.twig")
		},
		ajaxSignUp: (req,res) => {
			if(db.Users.isAlreadyExisting(req.body.username)){
				res.send({error: "Nom d'utilisateur deja utilisé"})
			} else {
				if(bd.Users.register(req.body.username, req.body.password)){
					res.send({
						sucess: "Utilisateur créé avec succès",
						redirect: '/login'
					})
				}
			}
		},

		renderLogOut: (req, res) => {
			//TODO suppr cookie
			res.render("logout.twig")
		}
	}
}
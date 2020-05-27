module.exports = function (db) {

	return {
		renderLogin: (req, res) => {
			res.render("login.twig")
		},
		ajaxLogin: (req,res) => {
			req.body
		},
		renderSignUp: (req, res) => {
			res.render("signUp.twig")
		},
		ajaxSignUp: (req,res) => {
			if(db.Users.isAlreadyExisting(req.body.username)){
				
			}
		} 
	}
}
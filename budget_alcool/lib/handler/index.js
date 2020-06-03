module.exports = function (db) {

	var autentification = require('./autentification')(db)
	var alcohol = require('./alcohol')(db)
	var cocktail = require('./cocktail')(db)

	return {
		renderIndex: function (req, res) {
			res.render('setup/home.html.twig')
			// res.render("index.html.twig")
		},
		autentification: autentification, 
		alcohol: alcohol, 
		cocktail: cocktail, 

		render404: function (req, res) {
			console.log(req.url)
			res.render("404.html.twig")
		}
	};
}
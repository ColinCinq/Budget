module.exports = function (db) {

	var autentification = require('./autentification')(db)

	return {
		renderIndex: function (req, res) {
			res.render("index.html.twig")
		},
		autentification: autentification, 

		render404: function (req, res) {
			console.log(req.url)
			res.render("404.html.twig")
		}
	};
}
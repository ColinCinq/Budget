module.exports = function (db) {

	return {
		renderIndex: (req, res) => {
			if(/*TODO cookie userId*/ === undefined){
				res.redirect('/login')
			}
			res.render("index.twig")
		},
		require('./autentification')(db)

		render404: (req, res) => {
			res.render("404.twig")
		}
	};
}
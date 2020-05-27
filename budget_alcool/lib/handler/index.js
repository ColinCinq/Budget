module.exports = function (db) {

	return {
		renderIndex: (req, res) => {
			if(req.body.userId === undefined){
				res.redirect('/login')
			}
			res.render("index.twig")
		},
		require('./autentification')(db)
	};
}
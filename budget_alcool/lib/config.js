var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	twig = require('twig')
	
// Export method to be compliant with Express 3.0
exports.applyConfiguration = function (app) {

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.set('view engine', 'twig')
	app.use(session({
		secret: 'jughnrjiébHBV@vgyg::vYIV{FTDFDfHIvghjk',
		resave: true,
		saveUninitialized: true,
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
		httpOnly: true,
		ephemeral: true
	}))
	app.use(express.static('public'))
	app.set('port', process.env.PORT || 8000)

}

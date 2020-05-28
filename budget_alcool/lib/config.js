var express = require('express'),
	bodyParser = require('body-parser'),
	session = require('express-session')
	
// Export method to be compliant with Express 3.0
exports.applyConfiguration = function (app) {

	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(session({
		secret: 'jughnrjibHBVvgygvYIVFTDFDfHIvghjk',
		resave: true,
		saveUninitialized: true
	}))
	app.use(express.static('../public'))
	app.set('port', process.env.PORT || 8000)

}

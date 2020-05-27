var express = require('express'),
	bodyParser = require('body-parser')

// Export method to be compliant with Express 3.0
var applyConfiguration = function (server) {
	var app = server

	app.configure(function () {
		app.use(bodyParser.urlencoded({ extended: true }))
		app.use(express.static('../public'))
		app.set('port', process.env.PORT || 3000)
	});

}

exports.applyConfiguration = applyConfiguration;

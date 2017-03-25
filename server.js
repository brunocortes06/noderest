// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
var morgan = require('morgan');
var lat;
var lng;

// app
app.use(morgan('dev'));
// log requests to the console

// body parser
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Running services.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	var newUrl;
	if (req.param('cityname') != null) { 
		newUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+req.param('cityname')+"&units=metric&APPID=1b393caab4119e08312a81bee707c1b2";
	}else if (req.param('zipcode') != null){
		newUrl = "http://api.openweathermap.org/data/2.5/forecast?q="+req.param('zipcode')+"&units=metric&APPID=1b393caab4119e08312a81bee707c1b2";
	}else{
		console.log('Error on request, maybe null parameters.');
	}
	//display the return data
	console.log('new ' + newUrl);
	request.get({
		url : newUrl
	}, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(body);
			console.log('Request Working!');
		} else {
			console.log('Error on request: ' + response.body);
		}
	});
	//res.json({ message: 'GET working!' });
});

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running on port ' + port);

function searchlatlng(zip) {
	lat = 1;
	lng = 2;
}

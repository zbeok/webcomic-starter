var fs = require('fs'); 
module.exports = function(app) {
var fs = require('fs'); 

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendFile('./public/index.html');
	});

};
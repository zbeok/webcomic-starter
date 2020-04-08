var fs = require('fs'); 
module.exports = function(app) {
var fs = require('fs'); 

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	var latest_c = "1";
	var latest_p = "05";
	var options = {root:'.'};
	app.get('/api/comic', function(req, res) {
		// console.log(!req.query.chapter || !req.query.page || (req.query.chapter==0 && req.query.page==0));
		if (!req.query.chapter || !req.query.page ) {
			console.log("latestpage"+'./public/chapters/'+latest_c+"/"+latest_p+".png");
			res.sendFile(toURL(latest_c,latest_p),options);
			return;
		}
		res.sendFile(toURL(req.query.chapter,req.query.page),options);
	});
	app.get('/api/qp', function(req, res) {
		if (req.query.chapter && req.query.page) {
			url = toURL(req.query.chapter,req.query.page);
			let ye = fs.exists(url, function(exists) { 
			  return (exists);
			}); 
			return ye;
		} else if (req.query.chapter){
			url = './public/chapters/'+req.query.chapter;
      		files = fs.readdirSync(url);
			res.send((files.length-1).toString());
		} else {
			url = './public/chapters/';
      		files = fs.readdirSync(url);
			res.send(files.length.toString());
		}
	});
	app.get('/api/dict', function(req, res) {
		url = './public/chapters/';
      	ch_len = fs.readdirSync(url).length;
		var story = [];
		for (var i=0;i<ch_len;i++) {
			purl = './public/chapters/'+i;
      		p_len = fs.readdirSync(purl).length;
			story.push(p_len);
		}
		res.send(story);
		
	});

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendFile('./public/index.html',options);
	});

	function toURL(ch,p){
		if ((p).toString().length<2) {
			p='0'+p;
		}
		return ('./public/chapters/'+ch +"/"+p+".png");
	}

};
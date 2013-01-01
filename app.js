var	express = require('express'),
	request = require('request');

var app = express()
  , server = require('http').createServer(app);
  
var port = process.env.PORT || 8888;
server.listen(port);
var ip = process.env.IP || 'http://localhost';

console.log('Starting Server at address: ' + ip + ":" + port);

app.configure(function() {
	app.use(express.logger());
	app.use(express.bodyParser());
});


app.get('/', function(req, res) {
	return get_kzradio_live_or_vod_url(function(err, url) {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		if (url) {
			res.write(JSON.stringify({url: url}));
		}
		res.end();
	});
});

function get_kzradio_live_or_vod_url(callback) {
	request('http://kzradio.net', function(error, response, body) {
		if (!error && response.statusCode == 200) {
			var regex = new RegExp('/.+show-live-stream-url.+(http.+)<\/span>.+?/');
			var url = regex.exec(body)[1];			
			console.log(url);
			return callback(null, url);
		} else {
			return (error, null);
		}
	});
}
	


	
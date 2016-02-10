var Twitter = require('twitter');// Step 1
var Keys = require('./keys.js')(); // Step 1
var http = require("http");
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);


////////////////// Step 1 //////////////////////////////////
var client = new Twitter({
    consumer_key: Keys.consumer_key,
    consumer_secret: Keys.consumer_secret,
    access_token_key: Keys.access_token_key,
    access_token_secret: Keys.access_token_secret
});


client.get('search/tweets', {q: 'i hate uber'}, function(error, tweets, response){
   console.log(tweets);
});

function requestHandler(req, res) {
	// Read index.html
	fs.readFile(__dirname + '/index.html', 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading whatever youre loading');
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
}

httpServer.listen(8080);

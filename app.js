var Twitter = require('twitter');// Step 1
var Keys = require('./keys.js')(); // Step 1
var http = require("http");
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);

var request = require('request'); //library



////////////////// Step 1 //////////////////////////////////
var client = new Twitter({
    consumer_key: Keys.consumer_key,
    consumer_secret: Keys.consumer_secret,
    access_token_key: Keys.access_token_key,
    access_token_secret: Keys.access_token_secret
});

// var gistRawURL = 'https://gist.githubusercontent.com/raw/365370/8c4d2d43d178df44f4c03a7f2ac0ff512853564e';
// request(gistRawURL, function (error, response, body) {
//   	if (!error && response.statusCode == 200) {
//     	var arr = body.split('\n');
//     	// pick random string from arr here...
// 	}
// });

// return;

client.get('search/tweets', {q: 'i hate uber'}, function(error, tweets, response){
   //console.log(tweets);
   console.log(tweets);

	// for (var i = 0; i < tweets.statuses.length; i++) {
		var tweet = tweets.statuses[0];
		// tweet.user.screen_name;
		// tweet.text;
		// tweet.id
	// }

	client.post('statuses/update', {
		status: '@'+ tweet.user.screen_name + ' pretty sure the driver had it worse', in_reply_to_status_id: tweet.in_reply_to_status_id

	}, function(error, tweet, response){
	  if (!error) {
	    console.log(tweet);
	  } else {
	  	console.log(error);
	  }
	});

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

httpServer.listen(8080, console.log("listening to 8080"));

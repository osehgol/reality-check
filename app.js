var Twitter = require('twitter');// Step 1
var Keys = require('./keys.js')(); // Step 1
var http = require("http");
var fs = require('fs'); // Using the filesystem module
var request = require('request'); //library https://github.com/request/request



////////////////// Step 1 //////////////////////////////////
var client = new Twitter({
    consumer_key: Keys.consumer_key,
    consumer_secret: Keys.consumer_secret,
    access_token_key: Keys.access_token_key,
    access_token_secret: Keys.access_token_secret
});

////////////////// Step 2 /////////////////////////////////
///https://github.com/request/request
var gistRawURL = 'https://gist.githubusercontent.com/osehgol/0e751856cc975f17aa87/raw';
request(gistRawURL, function (error, response, body) {
  	if (!error && response.statusCode == 200) {
    	var arr = body.split('\n');
    	console.log(arr);
    	arr = arr.filter(function(val){
    		return val != "";
    	});
    	var item = " " + arr[Math.floor(Math.random()*arr.length)];
    	makeTweet(item);
    	// pick random string from arr here...
	}
});

//arr.map lets you manipulate an array https://egghead.io/lessons/javascript-chaining-the-array-map-and-filter-methods
//arr.map(function(val{
//		return val + " is a number"
//}));

//var newArray =[];
//for (var i = 0; i < arr.length; i++){
//		if(arr[i] != "";
//			newArray.push(arr[i]);
//}

//BELOW:do the same for q: "i hate uber" as you did for meantweet gist
//[{"q": "i hate uber", "responses": ["response one", "response two"]}]

function makeTweet(responseText) {
	client.get('search/tweets', {q: 'i hate uber'}, function(error, tweets, response){
	console.log(tweets);
		// for (var i = 0; i < tweets.statuses.length; i++) {
			var tweet = tweets.statuses[Math.floor(Math.random()*tweets.statuses.length];
			// tweet.user.screen_name;
			// tweet.text;
			// tweet.id
		// }

		client.post('statuses/update', {
			status: '@'+ tweet.user.screen_name + responseText, in_reply_to_status_id: tweet.in_reply_to_status_id

		}, function(error, tweet, response){
		  if (!error) {
		    console.log(tweet);
		  } else {
		  	console.log(error);
		  }
		});

	});

}

// makeTweet();


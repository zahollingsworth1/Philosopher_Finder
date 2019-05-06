var path = require('path');

// Import the list of philos
var philos = require('../data/philo.js');

// Export API routes
module.exports = function(app) {
	

	// Total list of philos in JSON
	app.get('/api/philos', function(req, res) {
		res.json(philos);
	});

	// compare you to the api list
	app.post('/api/philos', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
         console.log(userInput);
         
         var userResponses = [userInput.scores1,userInput.scores2,userInput.scores3,userInput.scores4,userInput.scores5,userInput.scores6,userInput.scores7,userInput.scores8,userInput.scores9,userInput.scores10]
         console.log(userResponses)

		//var userResponses = scores;
		// console.log('userResponses = ' + userResponses);

		// math...
		var matchName = '';
		var matchImage = '';
		var totalDifference = 750000; 

		// First loop of api list
		for (var i = 0; i < philos.length; i++) {
			console.log('philo = ' + JSON.stringify(philos[i]));

			// second loop to compare scores
			var diff = 0;
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(philos[i].scores[j] - userResponses[j]);
			}
			console.log('difference = ' + diff);

			// if its lower than the other guys, its he new closest philo
			if (diff < totalDifference) {
				// console.log('philosopher name = ' + philos[i].name);
				// console.log('philosopher image = ' + philos[i].photo);

				totalDifference = diff;
				matchName = philos[i].name;
				matchImage = philos[i].photo;
			}
		}


		// Send philo back to post on survey page
		res.json({matchName: matchName, matchImage: matchImage});
	});
};
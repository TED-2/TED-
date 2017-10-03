// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data source holds an array of information on the potential matches.
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================
var db = require("./../models");


module.exports = function (app) {
	app.get( "/", function (req, res) {
		res.render( "index" );
	});

	app.get( "/search", function (req, res) {
		// res.render("ted2", {
		// 	main_speaker: "Ken Robinson",
		// 	url: "http://www.google.com"
		// });						
		db.Talks.findAll({
			where: {
				main_speaker: "Ken Robinson"
			}
		}).then(function(data) {
			res.render("ted2", {
				talk: data
			});						
		});
	});

	app.get( "/users", function (req, res) {
		db.User.findAll().then(function(data){
			res.json(data);
		});
	});
}
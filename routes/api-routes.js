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

	app.get("/search", function (req, res) {

		db.Talks.findAll({
			where: {
				main_speaker: req.query.name
			}
		}).then(function(data) {
			console.log(data);
			if(data.length > 0) {
				res.render("ted2", {
					talk: data
				});	
			} else {
				res.render("noresults");
			}
					
		}).catch(function(err){
			res.send(err);
		});
		
	});

	// app.get( "/search", function (req, res) {
	// 	var searchName = req.query;
	// 	console.log(searchName);
	// 	db.Talks.findAll({
	// 		where: {
	// 			main_speaker: searchName
	// 		}
	// 	}).then(function(data) {
	// 		res.render("ted2", {
	// 			talk: data
	// 		});
	// 	});
	// });

	app.get( "/users", function (req, res) {
		db.User.findAll().then(function(data){
			res.json(data);
		});
	});
}
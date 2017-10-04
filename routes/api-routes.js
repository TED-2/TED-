// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data source holds an array of information on the potential matches.
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================

// Requiring our model
var db = require("../models");

module.exports = function ( app ) {
    app.get( '/', function ( req, res ) {
        res.render( 'index' );
    });

	app.get("/ted2", function (req, res) {
		if ( req.session.user && req.cookies.user_sid ) {
			db.Talks.findAll({
				where: {
					main_speaker: req.query.name
				}
			}).then(function(data) {
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
		} else {
			res.redirect( '/login' );
		}
	});
}
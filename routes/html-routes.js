// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================

// Requiring our models for syncing
var db = require( '../models' );
// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function ( app ) {
    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    // middleware function to check for logged-in users
    function sessionChecker ( req, res, next ) {
        if ( req.session.user && req.cookies.user_sid ) {
            res.redirect( '/ted2' );
        } else {
            return next();
        }
    };

    app.route( '/' )
        .get( sessionChecker, ( req, res ) => {
            res.render( 'index' );
        } );

    // route for user Login
    app.route( '/login' )
        .post( ( req, res ) => {
            var email = req.body.email;
            var password = req.body.password;

            db.User.findOne( { 'where': { 'email': email } } ).then( function ( user ) {
                // console.log( user );
                if ( !user ) {
                    res.redirect( '/' );
                } else if ( !user._modelOptions.instanceMethods.validPassword( password, user ) ) {
                    res.redirect( '/' );
                } else {
                    req.session.user = user;
                    res.redirect( '/ted2' );
                }
            } );
        } );

    // route for user registration
    app.route( '/register' )
        .post( ( req, res ) => {
            db.User.create( {
                'email': req.body.email,
                'password': req.body.password
            } )
                .then( user => {
                    // console.log( user );
                    req.session.user = user.dataValues;
                    res.redirect( 'ted2' );
                } )
                .catch( error => {
                    if ( error ) {
                        res.redirect( '/' );
                    }
                } );
        } );

    // route for user's dashboard
    app.get( '/ted2', ( req, res ) => {
        if ( req.session.user && req.cookies.user_sid ) {
            db.Talks.findAll({
                where: {
                    main_speaker: req.query.name
                }
            }).then(function(data) {
                console.log("data.length is", data.length);
                if(data.length > 0) {
                    var searchArray = [];
                    for (var i = 0; i < data.length; i++) {
                        var linkURL = data[i].url;
                        var slicedURL = linkURL.slice(11);
                        var stitchedURL = "https://embed" + slicedURL;
                        data[i].embed = stitchedURL;
                    }
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
            res.cookie( 'error', 'You must be logged in to do that.' );
            res.redirect( '/login' );
        }
    } );

    // route for user logout
    app.get( '/logout', ( req, res ) => {
        if ( req.session.user && req.cookies.user_sid ) {
            res.clearCookie( 'user_sid' );
            res.redirect( '/' );
        } else {
            res.redirect( '/login' );
        }
    } );


    // route for handling 404 requests(unavailable routes)
    app.use( function ( req, res, next ) {
        res.status( 404 ).send( "Sorry can't find that!" );
    } );
};

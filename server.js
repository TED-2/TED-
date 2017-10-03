// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var cookieParser = require( 'cookie-parser' );
var session = require( 'express-session' );
var morgan = require( 'morgan' );

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require( "./models" );

// Sets up the Express app to handle data parsing
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { "extended": true } ) );
app.use( bodyParser.text() );
app.use( bodyParser.json( { "type": "application/vnd.api+json" } ) );

// Static directory
app.use( express.static( 'public' ) );
// set morgan to log info about our requests for development use.
app.use( morgan( 'dev' ) );
// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use( cookieParser() );

// initialize express-session to allow us track the logged-in user across sessions.
app.use( session( {
    'key': 'user_sid',
    'secret': 'somerandonstuffs',
    'resave': false,
    'saveUninitialized': false,
    'cookie': {
        'expires': 600000
    }
} ) );

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use( ( req, res, next ) => {
    if ( req.cookies.user_sid && !req.session.user ) {
        res.clearCookie( 'user_sid' );
    }
    next();
} );

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
            console.log( user );
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
                console.log( user );
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
        res.render( 'ted2' );
    } else {
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

// Set handlebars.
var exphbs = require( 'express-handlebars' );

app.engine( "handlebars", exphbs( { "defaultLayout": "main" } ) );
app.set( "view engine", "handlebars" );

// Routes
// =============================================================
require( "./routes/api-routes.js" )( app );

// Syncing our sequelize models and then starting our express app
db.sequelize.sync( ).then( function () {
    app.listen( PORT, function () {
        console.log( 'App listening on PORT ' + PORT );
    } );
} );

if(env === "development") {
	// Syncing our sequelize models and then starting our express app
	db.sequelize.sync( { "force": true } ).then( function () {
		app.listen( PORT, function () {
			console.log( "App listening on PORT " + PORT );
		} );
	} );
} else {
	// Syncing our sequelize models and then starting our express app
	db.sequelize.sync( { "force": false } ).then( function () {
		app.listen( PORT, function () {
			console.log( "App listening on PORT " + PORT );
		} );
	} );
}


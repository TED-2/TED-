<<<<<<< HEAD
var express = require("express");
var login = require('./routes/loginroutes');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();
// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to our upload module apis' });
});
//route to handle user registration
router.post('/register', login.register);
router.post('/login', login.login)
app.use('/api', router);
app.listen(5000);
=======
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
let env = process.env.NODE_ENV || 'development';

// Requiring our models for syncing
var db = require( './models' );

// Sets up the Express app to handle data parsing
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { 'extended': true } ) );
app.use( bodyParser.text() );
app.use( bodyParser.json( { 'type': 'application/vnd.api+json' } ) );

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

// Set handlebars.
var exphbs = require( 'express-handlebars' );

app.engine( 'handlebars', exphbs( { 'defaultLayout': 'main' } ) );
app.set( 'view engine', 'handlebars' );

// Routes
// =============================================================
require( './routes/api-routes.js' )( app );
require( './routes/html-routes.js' )( app );

if ( env === 'development' ) {
    // Syncing our sequelize models and then starting our express app
    db.sequelize.sync( { 'force': false } ).then( function () {
        app.listen( PORT, function () {
            console.log( 'App listening on PORT ' + PORT );
        } );
    } );
} else {
    // Syncing our sequelize models and then starting our express app
    db.sequelize.sync( { 'force': false } ).then( function () {
        app.listen( PORT, function () {
            console.log( 'App listening on PORT ' + PORT );
        } );
    } );
}

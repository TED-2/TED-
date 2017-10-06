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

            /**
             * Finding one user by email.
             */
            db.User.findOne( { 'where': { 'email': email } } ).then( function ( user ) {
                if ( !user ) {
                    res.cookie( 'error', 'This user does not exist.' );
                    res.redirect( '/' );
                } else if ( !user._modelOptions.instanceMethods.validPassword( password, user ) ) {
                    res.cookie( 'error', 'Password is incorrect.' );
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
                    req.session.user = user.dataValues;
                    res.redirect( 'ted2' );
                } )
                .catch( error => {
                    if ( error ) {
                        res.cookie( 'error', 'You are registered. Please login.' );
                        res.redirect( '/' );
                    }
                } );
        } );

    // route for user's dashboard
    app.get( '/ted2', ( req, res ) => {
        if ( req.session.user && req.cookies.user_sid ) {
            if ( req.query.name ) {
                db.Talks.findAll( {
                    'where': {
                        'main_speaker': req.query.name
                    }
                } ).then( function ( data ) {
                    if ( data.length > 0 ) {
                        /**
                         * Formating data for disply
                         */
                        for ( var i = 0; i < data.length; i++ ) {
                            data[i].embed = 'https://embed' + data[i].url.slice( 11 );
                            data[i].pageNum = Math.floor( i / 5 );
                            var tagArray = data[i].tags.split( "'" );
                            var newArray = [];
                            for ( var j = 0; j < tagArray.length; j++ ) {
                                if ( j % 2 === 1 ) {
                                    newArray.push( tagArray[j] );
                                }
                            }
                            data[i].tags = newArray;
                        }
                        res.render( 'ted2', {
                            'talk': data
                        } );
                    } else {
                        db.Talks.findAll( {
                            'order': [
                                ['view', 'DESC']
                            ],
                            'limit': 5
                        } ).then( function ( noData ) {
                            /**
                             * Formating data for disply
                             */
                            for ( var i = 0; i < noData.length; i++ ) {
                                noData[i].embed = 'https://embed' + noData[i].url.slice( 11 );
                                noData[i].pageNum = Math.floor( i / 5 );
                                var tagArray = noData[i].tags.split( "'" );
                                var newArray = [];
                                for ( var j = 0; j < tagArray.length; j++ ) {
                                    if ( j % 2 === 1 ) {
                                        newArray.push( tagArray[j] );
                                    }
                                }
                                noData[i].tags = newArray;
                            }
                            res.render( 'noresults', {
                                'talk': noData
                            } );
                        } );
                    }
                } ).catch( function ( err ) {
                    res.send( err );
                } );
            } else if ( req.query.subject ) {
                var tagQuery = '%' + req.query.subject + '%';
                db.Talks.findAll( {
                    'where': {
                        'tags': {
                            '$like': tagQuery
                        }
                    },
                    'limit': 5
                } ).then( function ( data ) {
                    if ( data.length > 0 ) {
                        /**
                         * Formating data for disply
                         */
                        for ( var i = 0; i < data.length; i++ ) {
                            data[i].embed = 'https://embed' + data[i].url.slice( 11 );
                            data[i].pageNum = Math.floor( i / 5 );
                            var tagArray = data[i].tags.split( "'" );
                            var newArray = [];
                            for ( var j = 0; j < tagArray.length; j++ ) {
                                if ( j % 2 === 1 ) {
                                    newArray.push( tagArray[j] );
                                }
                            }
                            data[i].tags = newArray;
                        }
                        res.render( 'ted2', {
                            'talk': data
                        } );
                    } else {
                        db.Talks.findAll( {
                            'order': [
                                ['view', 'DESC']
                            ],
                            'limit': 5
                        } ).then( function ( noData ) {
                            for ( var i = 0; i < noData.length; i++ ) {
                                /**
                                 * Formating data for disply
                                 */
                                noData[i].embed = 'https://embed' + noData[i].url.slice( 11 );
                                noData[i].pageNum = Math.floor( i / 5 );
                                var tagArray = noData[i].tags.split( "'" );
                                var newArray = [];
                                for ( var j = 0; j < tagArray.length; j++ ) {
                                    if ( j % 2 === 1 ) {
                                        newArray.push( tagArray[j] );
                                    }
                                }
                                noData[i].tags = newArray;
                            }
                            res.render( 'noresults', {
                                'talk': noData
                            } );
                        } );
                    }
                } ).catch( function ( err ) {
                    res.send( err );
                } );
            } else {
                db.Talks.findAll( {
                    'order': [
                        ['view', 'DESC']
                    ],
                    'limit': 5
                } ).then( function ( noData ) {
                    for ( var i = 0; i < noData.length; i++ ) {
                        /**
                         * Formating data for disply
                         */
                        noData[i].embed = 'https://embed' + noData[i].url.slice( 11 );
                        noData[i].pageNum = Math.floor( i / 5 );
                        var tagArray = noData[i].tags.split( "'" );
                        var newArray = [];
                        for ( var j = 0; j < tagArray.length; j++ ) {
                            if ( j % 2 === 1 ) {
                                newArray.push( tagArray[j] );
                            }
                        }
                        noData[i].tags = newArray;
                    }
                    res.render( 'first', {
                        'talk': noData
                    } );
                } );
            }
        } else {
            res.cookie( 'error', 'You must be logged in to do that.' );
            res.redirect( '/' );
        }
    } );

    // route for user logout
    app.get( '/logout', ( req, res ) => {
        if ( req.session.user && req.cookies.user_sid ) {
            res.clearCookie( 'user_sid' );
            res.redirect( '/' );
        } else {
            res.redirect( '/' );
        }
    } );

    // route for handling 404 requests(unavailable routes)
    app.use( function ( req, res, next ) {
        res.status( 404 ).send( "Sorry can't find that!" );
    } );
};

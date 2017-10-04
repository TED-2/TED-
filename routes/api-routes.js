// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data source holds an array of information on the potential matches.
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================
const db = require( '../models/talks' );

module.exports = function ( app ) {
    app.get( '/', function ( req, res ) {
        res.render( 'index' );
    } );

    app.get( '/search', function ( req, res ) {
        res.render( 'ted2' );
    } );

    app.get( '/search', function ( req, res ) {
        db.Talks.findAll( {
            'where': {
                'main_speaker': req.query.name
            }
        } ).then( function ( data ) {
            if ( data.length > 0 ) {
                res.render( 'ted2', {
                    'talk': data
                } );
            } else {
                res.render( 'noresults' );
            }
        } ).catch( function ( err ) {
            res.send( err );
        } );
    } );

    app.get( '/users', function ( req, res ) {
        db.User.findAll().then( function ( data ) {
            res.json( data );
        } );
    } );
};

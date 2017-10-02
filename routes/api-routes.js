// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// This data source holds an array of information on the potential matches.
// ===============================================================================

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function ( app ) {
    app.get( '/', function ( req, res ) {
        res.render( 'index' );
    } );
};

const expect = require( 'chai' ).expect;
/**
 * Required for http request.
 */
const request = require( 'request' );
const db = require( '../models' );
const newUser = {
    'email': 'testuser@gmail.com',
    'password': 'testpassword'
};

before( async () => {
    /**
     * Remove test user if present.
     */
    await db.User.destroy( {'where': {'email': newUser.email}} );
} );

after( () => {
    /**
     * Remove test user after testing is complete.
     */
    db.User.destroy( {'where': {'email': newUser.email}} )
        .then( () => {
            process.exit();
        } );
} );

/**
 * Testing registration.
 */
describe( 'Registration', () => {
    describe( 'Register a user', () => {
        it( 'should create user', ( done ) => {
            request.post( 'http://localhost:8080/register', {
                'form': newUser
            }, ( err, res, body ) => {
                expect( err ).to.equal( null );
                expect( res.statusCode ).to.equal( 302 );
                return done();
            } );
        } );

        it( 'should create the new user in users table', ( done ) => {
            db.User.findOne( { 'where': { 'email': newUser.email } } )
                .then( ( user ) => {
                    expect( user.email ).to.equal( newUser.email );
                    return done();
                } );
        } );
    } );
} );

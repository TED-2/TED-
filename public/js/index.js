$( '#signUp' ).hide();

// Only run code when the page is done loading
$( document ).ready( function () {
    // Set up the modals
    $( '.modal' ).modal();

    // Log out the user when the logout button is clicked
    $( '#logOut' ).on( 'click', function () {
    } );

    // Switch right box from sign in to register
    $( '#switchToSignUp' ).on( 'click', function () {
        $( '#signUp' ).show();
        $( '#signIn' ).hide();
    } );

    // Switch right box from register to sign in
    $( '#switchToSignIn' ).on( 'click', function () {
        $( '#signUp' ).hide();
        $( '#signIn' ).show();
    } );
} );

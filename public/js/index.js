$( '#signUp' ).hide();

// Only run code when the page is done loading
$( document ).ready( function () {
    // Set up the modals
    $( '.modal' ).modal();

    // Log out the user when the logout button is clicked
    $( '#logOut' ).on( 'click', function () {
        // firebase.auth().signOut();
    } );

    // Switch right box from sign in to sign up
    $( '#switchToSignUp' ).on( 'click', function () {
        $( '#signUp' ).show();
        $( '#signIn' ).hide();
    } );

    // Switch right box from sign up to sign in
    $( '#switchToSignIn' ).on( 'click', function () {
        $( '#signUp' ).hide();
        $( '#signIn' ).show();
    } );
} );

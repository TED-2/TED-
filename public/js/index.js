$( '#signUp' ).hide();

// Only run code when the page is done loading
$( document ).ready( function () {
    // Set up the modals
    $( '.modal' ).modal();

    // Submit button on signup page
    $( '#signUpBtn' ).on( 'click', function ( event ) {
        event.preventDefault();
        currentEmail = $( '#signUpEmail' ).val().trim().toLowerCase();
        currentUser = currentEmail.slice( 0, -4 );
        currentPass = $( '#signUpPass' ).val().trim();
        checkPass = $( '#checkPass' ).val().trim();
        userName = $( '#name' ).val().trim();

        // Make sure both password inputs are the same
        if ( currentPass === checkPass ) {
            // Create a user on firebase with inputted email, password, and username
            firebase.auth().createUserWithEmailAndPassword( currentEmail, currentPass ).then( function () {
                // Set users display name
                var user = firebase.auth().currentUser;
                user.updateProfile( {
                    'displayName': userName
                } ).catch( function ( error ) {} );

                // Clear input fields
                $( '#signUpEmail, #signUpPass, #name' ).val( '' );
            }).catch( function ( error ) {
                //  Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                $( '.errorMsg' ).html( errorMessage );
                $( '#signUpEmail, #signUpPass, #name, #checkPass' ).val( '' );
            });
        } else {
            // Error message if both passwords are not the same
            $( '.errorMsg' ).html( 'Passwords do not match' );
            $( '#signUpEmail, #signUpPass, #name, #checkPass' ).val( '' );
        }
    });

    // Code for the submit button on the sign in page
    $( '#signInBtn' ).on( 'click', function ( event ) {
        event.preventDefault();
        currentEmail = $( '#signInEmail' ).val().trim().toLowerCase();
        currentUser = currentEmail.slice( 0, -4 );
        currentPass = $( '#signInPass' ).val().trim();

        // Sign in user with given email and password
        firebase.auth().signInWithEmailAndPassword( currentEmail, currentPass ).then( function () {
            var user = firebase.auth().currentUser;
            userName = user.displayName;
            $( '#signInEmail, #signInPass' ).val( '' );
        } ).catch( function ( error ) {
            //  Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            $( '.errorMsg' ).html( errorMessage );
            $( '#signInEmail, #signInPass' ).val( '' );
        } );
    } );

    // Log out the user when the logout button is clicked
    $( '#logOut' ).on( 'click', function () {
        firebase.auth().signOut();
    });

    // Switch right box from sign in to sign up
    $( '#switchToSignUp' ).on( 'click', function () {
        $( '#signUp' ).show();
        $( '#signIn' ).hide();
    });

    // Switch right box from sign up to sign in
    $( '#switchToSignIn' ).on( 'click', function () {
        $( '#signUp' ).hide();
        $( '#signIn' ).show();
    });
});

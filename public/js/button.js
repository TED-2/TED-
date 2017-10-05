$( document ).ready( function () {
    // Saves the state of the Speaker Search card
    var speakerOpen = false;
    // Saves the state of the Subject Search card
    var subjectOpen = false;

    // On load, hide the Speaker Search card
    $( '#speakerCard' ).css( 'display', 'none' );
    // On load, hide the Subject Search card
    $( '#subjectCard' ).css( 'display', 'none' );

    // When the Speaker Search button is clicked
    $( '#speakerButton' ).click( function () {
        // If it isn't open
        if ( !speakerOpen ) {
            // Display it
            $( '#speakerCard' ).css( 'display', 'block' );
            // Hide the Subject Search card
            $( '#subjectCard' ).css( 'display', 'none' );
            // Set Speaker Search state to true
            speakerOpen = true;
            // Set Subject Search state to false
            subjectOpen = false;
            // Otherwise
        } else {
            // Hide the Speaker Search card
            $( '#speakerCard' ).css( 'display', 'none' );
            // Set the Speaker Search state to false
            speakerOpen = false;
        }
    } );

    // When the Subject Search button is clicked
    $( '#subjectButton' ).click( function () {
        // If it isn't open
        if ( !subjectOpen ) {
            // Display it
            $( '#subjectCard' ).css( 'display', 'block' );
            // Hide the Speaker Search card
            $( '#speakerCard' ).css( 'display', 'none' );
            // Set the Subject Search state to true
            subjectOpen = true;
            // Set the Speaker Search state to false
            speakerOpen = false;
            // Otherwise
        } else {
            // Hide the Subject Search card
            $( '#subjectCard' ).css( 'display', 'none' );
            // Set the Subject Search state to false
            subjectOpen = false;
        }
    } );

    // When doing a Speaker Search
    $( '#speakerBtn' ).on( 'click', function ( event ) {
        // Stop default behaviour
        event.preventDefault();
        // Get the search term, trim it, and set to lowercase
        var searchName = $( '#speakerName' ).val().trim().toLowerCase();
        // Load the page with the name search
        window.location.href = window.location.origin + '/ted2?name=' + searchName;
    } );

    // When doing a Subject Search
    $( '#subjectBtn' ).on( 'click', function ( event ) {
        // Stop default behaviour
        event.preventDefault();
        // Get the search term, trim it, and set to lowercase
        var subjectName = $( '#subjectName' ).val().trim().toLowerCase();
        // Load the page with the subject search
        window.location.href = window.location.origin + '/ted2?subject=' + subjectName;
    } );

    // When a Video button is clicked
    $( '.vidButton' ).on( 'click', function () {
        // If the block is showing
        if ( $( '#vid' + this.id ).css( 'display' ) === 'block' ) {
            // Hide it
            $( '#vid' + this.id ).css( 'display', 'none' );
            // Otherwise
        } else {
            // Show it
            $( '#vid' + this.id ).css( 'display', 'block' );
        }
    } );
} );

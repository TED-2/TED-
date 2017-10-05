$(document).ready(function() {
	var speakerOpen = false;					// Saves the state of the Speaker Search card
	var subjectOpen = false;					// Saves the state of the Subject Search card

	$("#speakerCard").css("display", "none");	// On load, hide the Speaker Search card
	$("#subjectCard").css("display", "none");	// On load, hide the Subject Search card

	$("#speakerButton").click(function() {					// When the Speaker Search button is clicked
		if (!speakerOpen) {									// If it isn't open
			$("#speakerCard").css("display", "block");		// Display it
			$("#subjectCard").css("display", "none");		// Hide the Subject Search card
			speakerOpen = true;								// Set Speaker Search state to true
			subjectOpen = false;							// Set Subject Search state to false
		}
			else {												// Otherwise
				$("#speakerCard").css("display", "none");		// Hide the Speaker Search card
				searchOpen = false;								// Set the Speaker Search state to false
			}
	});

	$("#subjectButton").click(function() {					// When the Subject Search button is clicked
		if (!subjectOpen) {									// If it isn't open
			$("#subjectCard").css("display", "block");		// Display it
			$("#speakerCard").css("display", "none");		// Hide the Speaker Search card
			subjectOpen = true;								// Set the Subject Search state to true
			speakerOpen = false;							// Set the Speaker Search state to false
		}
			else {												// Otherwise
				$("#subjectCard").css("display", "none");		// Hide the Subject Search card
				subjectOpen = false;							// Set the Subject Search state to false
			}
	});

	$("#speakerBtn").on("click", function(event) {						// When doing a Speaker Search
		event.preventDefault();											// Stop default behaviour
		var searchName = $("#speakerName").val().trim().toLowerCase();	// Get the search term, trim it, and set to lowercase
		window.location.href = window.location.origin + "/ted2?name="+searchName;	// Load the page with the name search
	});

	$("#subjectBtn").on("click", function(event) {						// When doing a Subject Search
		event.preventDefault();											// Stop default behaviour
		var subjectName = $("#subjectName").val().trim().toLowerCase();	// Get the search term, trim it, and set to lowercase
		window.location.href = window.location.origin + "/ted2?subject="+subjectName;	// Load the page with the subject search
	});

	$(".vidButton").on("click", function() {						// When a Video button is clicked
		if ($("#vid" + this.id).css("display") === "block") {		// If the block is showing
			$("#vid" + this.id).css("display", "none");				// Hide it
		} else {													// Otherwise
			$("#vid" + this.id).css("display", "block");			// Show it
		}
	})
});
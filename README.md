# TED²

## About
TED² is a navigational tool to search the TED database.  We provide an interface to access the TED database, by asking the user for search parameters, which will return a list of related TED talks. 

## Authors
* Julie Ching
* Brian Evans
* Susan Tarnowski
* Ricardo Alcazar

## Walkthrough
Nagivate to TED² (https://ted-squared.herokuapp.com/).
On the front page, the user will see the information about TED².  Under the information, the user will see, "Sign In" where the user is able to login. If they are a new user, they will be able to select, "New to the site? Click here to sign up" to register. 

When registering, the user is to sign up with an email address along with a password. After this is complete, they are directed to our popular views page.  If the user is already in the database, it will notify them that they are a registered user and asks the user to login and will redirect them to the sign on page.

If they are a returning user, the user will sign on with an email address and password and select, "Submit". Once they have signed on, this will direct them to our popular views page where they will be able to view the most popular TED Talk videos.

On the top right navigation bar, the user has three choices: search by speaker, search by subject, or logout. 

If a user selects the, "Speaker Search" the search bar will populate on top of the page under the navigation bar a box where the user is able to enter a speaker's name.  This will generate a list; the list will include the speaker's name, title of the talk, a button to view the talk, a link with the speakers name under the name and title with related tags listed below the speaker's name.  

The view button, once clicked, will expand and show the video for you to play, pause, and expand the screen. User is able to select the view button again to hide the video.

The name of the speaker will link the user to view a list of searches based on the speaker.  If the tags are selected, the list will show any videos that have the same tags.

If the user selects the subject link on the navigation bar, it will populate the search box that will allow the user to type in topics and it will search the database base on the tags.

At any time the user is able to search by speaker or subject by clicking on the appropriate links on top of the navigation bar and it will show the search box under the navigation bar.  

If the user selects the name and title on top of the search list, it will direct the user directly to TED Talks link where the video is originally from. 

The user is able to select the logout link on the navigation bar at any time to logout of the application and will require the user to login if they want to re-enter the application to do a search.

## Mocha Testing Instructions
Start the node server then run the following:
```
npm test
```

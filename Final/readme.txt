Joe Kimpel
CS 601 - Summer 2012
Final Project
8/6/2012

My project is a web page for Narcotics Anonymous members and other interested parties to find N.A. meetings in the Boston area.

The URL is:

http://jkcs601.zxq.net/Final/main.php

***Technologies used***:

The site is written in HTML5, CSS, Javascript, and PHP.  The database was MySQL, so some SQL was used to manage the underlying data.

I also made use of JQuery, including JQuery-UI for portability, code-simplification and aesthetics.
Info about JQuery: http://jquery.com/
Info about JQuery-UI: http://jqueryui.com/

Additionally, I used the open-source tool php-mobile-detect for browser detection.
Info about php-mobile-detect: http://code.google.com/p/php-mobile-detect/

***Key Features***:

- Everything is incorporated into one page using Ajax.  The entry page is main.php.

- The site is able to use geolocation (if the browser supports it) to locate the user.

- The site uses local storage (if the browser supports it) to store the user's recent locations.

- Geocoding is used to convert manually typed location searches to latitude & longitude
		(I used googleapis via YQL to get around same-origin policy issues)

- Reverse geocoding is used to convert geolocation-provided coordinates into a human-readable format
		(I used googleapis via YQL to get around same-origin policy issues)

- I used PHP session capabilities to keep track of whether or not a user is logged in

- I integrated with Google maps both to provide maps of meetings, directions, and to allow
	a user adding a meeting to verify the location before putting it in the database

- I used the php-mobile-detect library to determine mobile users, and have two separate stylesheets,
	one for traditional browsers, one for mobile.  I also made some changes directly to the HTML.
	Between these two, the site is easily navigable on either a phone or a computer.

***Testing Platform***:

I developed mainly in Chrome v21 on a Mac running OS X 10.7.  
I also did some testing on Firefox, Safari and Opera, and didn't see any major differences (thanks very much to JQuery).

For Mobile, I did most of my testing on Android Browser on Android 2.2.2 on my Motorola Triumph.

A full history of my development on this project is on github:

https://github.com/jkimpel/CS601/commits/master/Final

Thanks for taking a look!  I look forward to getting some feedback on my work.

-- Joe Kimpel
jmkimpel@bu.edu

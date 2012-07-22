<!doctype html>
<html lang="en">
<head>
	<title>New Meeting Confirmation</title>
	<meta charset="utf-8"/>
	<link href="nerna_style.css" type="text/css" rel="stylesheet"/>
</head>
<body>
	<h1>Meeting Added!:</h1>
	<?php
		$name = $_GET['name'];
		$day = $_GET['day'];
		$time = $_GET['time'];
		$address = $_GET['address'];
		$town = $_GET['town'];
		$isOpen = $_GET['isOpen'];
		$lat = $_GET['lat'];
		$lng = $_GET['lng'];
	?>
	<div class='form'>
		<ul>
			<li>Name: <?=$name?></li>
			<li>Day: <?=$day?></li>
			<li>Time: <?=$time?></li>
			<li>Address: <?=$address?></li>
			<li>Town: <?=$town?></li>
			<li>Type: <?=$isOpen?></li>
			<li>Lat: <?=$lat?></li>
			<li>Long: <?=$lng?></li>
		</ul>
	</div>
	<div class="back"><a href="NewMeeting.html">Add Another Meeting</a></div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
</body>
</html>
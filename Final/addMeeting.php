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
		function formatTime($t){
			$ft = date("H:i", strtotime($t));
			return $ft;
		}
	
		$name = $_GET['name'];
		$day = $_GET['day'];
		$time = $_GET['time'];
		$address = $_GET['address'];
		$town = $_GET['town'];
		$isOpen = $_GET['isOpen'];
		$lat = $_GET['lat'];
		$lng = $_GET['lng'];
		
		$formattedTime = formatTime($time);
		
		$sql = "INSERT into Meeting (Name, Time, Day, Address, Town, IsOpen, Latitude, Longitude)
		Values
		('$name', '$formattedTime', '$day', '$address', '$town', '$isOpen', '$lat', '$lng');";
		
		$con = mysql_connect("localhost","736253_root","cs601");
		if (!$con)
		{
			die('Could not connect: ' . mysql_error());
		}

		mysql_select_db("jkcs601_zxq_nerna", $con);
		
		if (!mysql_query($sql, $con)){
			die('Unable to Insert: ' . mysql_error());
		}
		
		mysql_close($con);
	?>
	<div class='form'>
		<ul>
			<li>Name: <?=$name?></li>
			<li>Day: <?=$day?></li>
			<li>Time: <?=$formattedTime?></li>
			<li>Address: <?=$address?></li>
			<li>Town: <?=$town?></li>
			<li>Type: <?=$isOpen?></li>
			<li>Lat: <?=$lat?></li>
			<li>Long: <?=$lng?></li>
		</ul>
	</div>
	<div class="back"><a href="NewMeeting.html">Add Another Meeting</a></div>
	<div class="back"><a href="index.html">Go to Meeting Search</a></div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
</body>
</html>
<!doctype html>
<html lang="en">
<head>
	<title>New Meeting Confirmation</title>
	<meta charset="utf-8"/>
	<?php
		include("Mobile_Detect.php");
		$detect = new Mobile_Detect();
		if ($detect->isMobile()){
			echo '<link href="nerna_style_m.css" type="text/css" rel="stylesheet"/>';
		}else{
			echo '<link href="nerna_style.css" type="text/css" rel="stylesheet"/>';
		}
	?>
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
		
		$formattedTime = date("H:i", strtotime($time));
		$formattedName = addslashes($name);
		
		$sql = "INSERT into Meeting (Name, Time, Day, Address, Town, IsOpen, Latitude, Longitude)
		Values
		('$formattedName', '$formattedTime', '$day', '$address', '$town', '$isOpen', '$lat', '$lng');";
		
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
	<div class="back"><a href="NewMeeting.php">Add Another Meeting</a></div>
	<div class="back"><a href="index.php">Go to Meeting Search</a></div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
</body>
</html>
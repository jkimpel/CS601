
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
<table>
	<tr><td>Name: </td><td><?=$name?></td></tr>
	<tr><td>Day: </td><td><?=$day?></td></tr>
	<tr><td>Time: </td><td><?=$formattedTime?></td></tr>
	<tr><td>Address: </td><td><?=$address?></td></tr>
	<tr><td>Town: </td><td><?=$town?></td></tr>
	<tr><td>Type: </td><td><?=$isOpen?></td></tr>
	<tr><td>Lat: </td><td><?=$lat?></td></tr>
	<tr><td>Long: </td><td><?=$lng?></td></tr>
</table>
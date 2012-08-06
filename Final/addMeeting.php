<?php	
	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
	function validateInput($name, $day, $time, $address, $town, $isOpen, $lat, $lng){
		$pattern = '/^.{3,40}$/';
		if (!preg_match($pattern, $name)){
			echo 'Failed on name';
			return false;
		}
		$pattern = '/^[0-6]$/';
		if (!preg_match($pattern, $day)){
			echo 'Failed on day';
			return false;
		}
		$pattern = '/^(0?[1-9]|1[012])(:[0-5]\d)?(am|AM|pm|PM)?$/';
		if (!preg_match($pattern, $time)){
			echo 'Failed on time';
			return false;
		}
		$pattern = '/^.{3,40}$/';
		if (!preg_match($pattern, $address)){
			echo 'Failed on address';
			return false;
		}
		$pattern = '/^.{3,40}$/';
		if (!preg_match($pattern, $town)){
			echo 'Failed on town';
			return false;
		}
		$pattern = '/^[0-1]$/';
		if (!preg_match($pattern, $isOpen)){
			echo 'Failed on isOpen';
			return false;
		}
		$pattern = '/^-{0,1}\d*\.{0,1}\d+$/';
		if (!preg_match($pattern, $lat)){
			echo 'Failed on lat as number';
			return false;
		} else {
			$flat = floatval($lat);
			if (($flat < 40) || ($flat > 44)){
				echo 'Failed on lat out-of-bounds';
				return false;
			}
		}
		$pattern = '/^-{0,1}\d*\.{0,1}\d+$/';
		if (!preg_match($pattern, $lng)){
			echo 'Failed on lng as number';
			return false;
		} else {
			$flng = floatval($lng);
			if (($flng < -75) || ($flng > -69)){
				echo 'Failed on lng out-of-bounds';
				return false;
			}
		}
		return true;
	}
	

	$name = $_GET['name'];
	$day = $_GET['day'];
	$time = $_GET['time'];
	$address = $_GET['address'];
	$town = $_GET['town'];
	$isOpen = $_GET['isOpen'];
	$lat = $_GET['lat'];
	$lng = $_GET['lng'];
	
	if (validateInput($name, $day, $time, $address, $town, $isOpen, $lat, $lng)){
		$formattedTime = date("H:i", strtotime($time));
		$formattedName = addslashes($name);
		
		$sql = "INSERT into Meeting (Name, Time, Day, Address, Town, IsOpen, Latitude, Longitude)
		Values
		('$formattedName', '$formattedTime', '$day', '$address', '$town', '$isOpen', '$lat', '$lng');";

		include 'db.php';
		if (!mysql_query($sql, $con)){
			die('Unable to Insert: ' . mysql_error());
		}
		mysql_close($con);
		echo "<h3>Success!</h3>";
	}
	else{
		echo "<h3>Failure...</h3>";
	}
?>
<table>
	<tr><td>Name: </td><td><?=$name?></td></tr>
	<tr><td>Day: </td><td><?=$day?></td></tr>
	<tr><td>Time: </td><td><?=$time?></td></tr>
	<tr><td>Address: </td><td><?=$address?></td></tr>
	<tr><td>Town: </td><td><?=$town?></td></tr>
	<tr><td>Type: </td><td><?=$isOpen?></td></tr>
	<tr><td>Lat: </td><td><?=$lat?></td></tr>
	<tr><td>Long: </td><td><?=$lng?></td></tr>
</table>
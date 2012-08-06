<?php
	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/

	function dayOfWeek($d){
		$days = array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
		return $days[$d];
	}
	
	//convert a value to radians
	function rad($val){
		return $val * pi() / 180;
	}
	
	//calculate distance from two points
	// based on http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
	function distance($lat1, $lng1, $lat2, $lng2){
		$r = 3959; //Radius of earth in miles
		$dlat = rad($lat2 - $lat1);
		$dlng = rad($lng2 - $lng1);
		$a = pow(sin($dlat/2), 2) + cos(rad($lat1))*cos(rad($lat2))*pow(sin($dlng/2), 2);
		$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
		$d  = $c * $r;
		return $d;		
	}
	
	function validateData($day, $isOpen, $sort, $lat, $lng, $admin){
		$pattern = '/^[0-7]$/';
		if (!preg_match($pattern, $day)){
			echo '<h3>Bad Search Params: day='.$day.'</h3>';
			exit();
		}
		$pattern = '/^[0-2]$/';
		if (!preg_match($pattern, $isOpen)){
			echo '<h3>Bad Search Params: isOpen='.$isOpen.'</h3>';
			exit();
		}
		$pattern = '/^[dtw]$/';
		if (!preg_match($pattern, $sort)){
			echo '<h3>Bad Search Params: sort='.$sort.'</h3>';
			exit();
		}
		$pattern = '/^-{0,1}\d*\.{0,1}\d+$/';
		if (!preg_match($pattern, $lat)){
			echo '<h3>Bad Search Params: lat='.$lat.' - not a number</h3>';
			exit();
		} else {
			$flat = floatval($lat);
			if (($flat < -90) || ($flat > 90)){
				echo '<h3>Bad Search Params: lat='.$lat.' - out of bounds</h3>';
				exit();
			}	
		}
		$pattern = '/^-{0,1}\d*\.{0,1}\d+$/';
		if (!preg_match($pattern, $lng)){
			echo '<h3>Bad Search Params: lng='.$lng.' - not a number</h3>';
			exit();
		} else {
			$flng = floatval($lng);
			if (($flng < -180) || ($flng > 180)){
				echo '<h3>Bad Search Params: lng='.$lng.' - out of bounds</h3>';
				exit();
			}		
		}
		$pattern = '/^[0-1]$/';
		if (!preg_match($pattern, $admin)){
			echo '<h3>Bad Search Params: admin='.$admin.'</h3>';
			exit();
		}
		
	}
	
	include("Mobile_Detect.php");
	$detect = new Mobile_Detect();
	$mbl = $detect->isMobile();
	
	$day = $_GET['day'];
	$isOpen = $_GET['isOpen'];
	$sort = $_GET['sort'];
	$lat = $_GET['lat'];
	$lng = $_GET['long'];
	$admin = $_GET['admin'];
	
	validateData($day, $isOpen, $sort, $lat, $lng, $admin);
	
	$dist = (($lat != 0) && ($lng != 0));
	
	if (($sort !="t") && ($sort != "w") && ($sort != "d")){
		$sort = "t";
	}
	
	if ((!$dist) && ($sort == "d")){
		$sort = "t";
	}
	
	$qstring = "SELECT * FROM Meeting";
	//$whered is a boolean, whether or not a where clause has been appended
	$whered = false;

	if ($day!=7)
	{
		$qstring = $qstring . " Where Day = '$day'";
		$whered = true;
	} 
	
	if ($isOpen=="1"){
		if ($whered)
			$qstring = $qstring . " and IsOpen = 1";
		else{
			$qstring = $qstring . " where IsOpen = 1";
			$whered = true;
		}
	} else if ($isOpen=="0"){
		if ($whered)
			$qstring = $qstring . " and IsOpen = 0";
		else{
			$qstring = $qstring . " where IsOpen = 0";
			$whered = true;
		}
	}
	
	if ($sort == "t"){
		$qstring = $qstring . " order by Town";
	}else if ($sort == "w"){
		$qstring = $qstring . " order by Day, Time";
	}
	
	include 'db.php';
	
	$result = mysql_query($qstring);	
	
	$rows = array();
	
	if ($dist){
		$dists = array();
		$indexes = array();
		$num = 0;
	}
	
	while($row = mysql_fetch_array($result))
	{
		array_push($rows, $row);
		if ($sort == "d"){
			array_push($dists, distance($row['Latitude'], $row['Longitude'], $lat, $lng));
			array_push($indexes, $num);	
			$num++;
		}
	}
	
	if (($sort == "d")&&($num>0)){
		$rowswithd = array_combine($indexes, $dists);
		asort($rowswithd, SORT_NUMERIC);
		$indexes = array_keys($rowswithd);
	}
?>
	
	<div id="dataAccordion">			
<?php 
	for($i = 0; $i < count($rows); $i++){
		if ($sort == "d")
			$row = $rows[$indexes[$i]];
		else
			$row = $rows[$i];
		if ($dist){
			$d = distance($row['Latitude'], $row['Longitude'], $lat, $lng);
		}
		
		echo "<h2>" . $row['Name'];
		if ($sort == 'd'){
			printf(" - %.2f miles", $d);
		} else if ($sort == 'w'){
			date_default_timezone_set('America/New_York');
			echo " - ".date("g:ia", strtotime($row['Time']))." ".dayOfWeek($row['Day']);
			if ($row['Day'] == date('w', time())){
				if (strtotime($row['Time']) > (time())){
					echo "<span class='highlight'>(Later Today!)</span>";
				}
			}
		}else if ($sort == 't'){
			echo " - ".$row['Town'];
		}
		echo "</h2>";
		echo "<div><table>";
		echo "<tr><td>When:</td>";
		if ($mbl){
			echo "</tr><tr class='nonBold'>";
		}
		echo "<td>" . dayOfWeek($row['Day']) . "";
		echo " " . date("g:ia", strtotime($row['Time'])) . "</td></tr>";
		if ($dist){
			echo "<tr><td>Directions:</td>";
			if ($mbl){
				echo "</tr><tr class='nonBold'>";
			}
			echo "<td>";
			echo "<a class='linkButton' target='_blank' href='http://maps.google.com/maps?saddr=".$lat.",".$lng."&daddr=".$row['Latitude'].",".$row['Longitude']."'>";
			echo $row['Address'].", ".$row['Town']."</a>";
			printf(" (%.2f miles)", $d);
			echo "</td></tr>";
		}else{
			echo "<tr><td>Location:</td>";
			if ($mbl){
				echo "</tr><tr>";
			}
			echo "<td>";
			echo "<a class='linkButton' target='_blank' href='http://maps.google.com/maps?q=".$row['Latitude'].",".$row['Longitude']."'>";
			echo $row['Address'] . ", " . $row['Town'] . "</a></td></tr>";		
		}
		echo "<tr><td>Type:</td>";
		if ($mbl){
			echo "</tr><tr>";
		}
		echo "<td>";
		if ($row['IsOpen']==1)
		{
			echo "<button onclick='explainOpen()'>Open</button></td></tr>";
		}
		else
		{
			echo "<button onclick='explainClosed()'>Closed</button></td></tr>";
		}
		if ($admin){
			$fname = addslashes($row['Name']);
			echo "<tr><td>Manage:</td>";
			if ($mbl){
				echo "</tr><tr>";
			}
			echo "<td><button onclick='deleteMeeting(".$row['id'].")'>Delete!</button></td></tr>";
		}
		
		echo "</table></div>";
	}

	echo "</div>";
	
	$count = count($rows);
	if ($count == 0){
		echo "<h3>I couldn't find any meetings!</h3>";
	} 

	mysql_close($con);
?>
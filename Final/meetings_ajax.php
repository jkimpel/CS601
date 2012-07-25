<?php
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

	$con = mysql_connect("localhost","736253_root","cs601");
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}

	mysql_select_db("jkcs601_zxq_nerna", $con);
	
	$day = $_GET['day'];
	$isOpen = $_GET['isOpen'];
	$lat = $_GET['lat'];
	$lng = $_GET['long'];
	$admin = $_GET['admin'];
	
	$dist = (($lat != 0) && ($lng != 0));
	
	$qstring = "SELECT * FROM Meeting";
	//$whered is a boolean, whether or not a where clause has been appended
	$whered = false;

	if ($day!=7)
	{
		$qstring = $qstring . " Where Day = '$day'";
		$whered = true;
	} 
	
	if ($isOpen=="open"){
		if ($whered)
			$qstring = $qstring . " and IsOpen = 1";
		else{
			$qstring = $qstring . " where IsOpen = 1";
			$whered = true;
		}
	} else if ($isOpen=="closed"){
		if ($whered)
			$qstring = $qstring . " and IsOpen = 0";
		else{
			$qstring = $qstring . " where IsOpen = 0";
			$whered = true;
		}
	}
	
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
		if ($dist){
			array_push($dists, distance($row['Latitude'], $row['Longitude'], $lat, $lng));
			array_push($indexes, $num);	
			$num++;
		}
	}
	
	if (($dist)&&($num>0)){
		$rowswithd = array_combine($indexes, $dists);
		asort($rowswithd, SORT_NUMERIC);
		$indexes = array_keys($rowswithd);
	}
?>
	<table>
		<tr>
			<th>Name</th>
			<th>Day</th>
			<th>Time</th>
			<th>Address</th>
			<th>Town</th>
			<th>Open?</th>
			
<?php 
	if ($dist) 
		echo "<th>Distance</th>";
	
	if ($admin)
		echo "<th>Delete</th>";
	
	echo "</tr>";

	for($i = 0; $i < count($rows); $i++){
		if ($dist)
			$row = $rows[$indexes[$i]];
		else
			$row = $rows[$i];
		echo "\t\t<tr>\n";
		echo "\t\t\t<td>" . $row['Name'] . "</td>\n";
		echo "\t\t\t<td>" . dayOfWeek($row['Day']) . "</td>\n";
		echo "\t\t\t<td> " . date("g:ia", strtotime($row['Time'])) . "</td>\n";
		echo "\t\t\t<td> " . $row['Address'] . "</td>\n";
		echo "\t\t\t<td> " . $row['Town'] . "</td>\n";
		if ($row['IsOpen']==1)
		{
			echo "\t\t\t<td>Open</td>\n";
		}
		else
		{
			echo "\t\t\t<td>Closed</td>\n";
		}
		if ($dist){
			echo "\t\t\t<td>";
			echo "<a target='_blank' href='http://maps.google.com/maps?saddr=".$lat.",".$lng."&daddr=".$row['Latitude'].",".$row['Longitude']."'>";
			printf("%.2f miles", distance($row['Latitude'], $row['Longitude'], $lat, $lng));
			echo "</a></td>\n";
		}
		if ($admin){
			echo "\t\t\t<td>";
			$fname = addslashes($row['Name']);
			echo "<button onclick='deleteMeeting(".$row['id'].")'>Delete!</button>";
			echo "</td>";
		}
		
		echo "\t\t</tr>\n";
	}

	echo "\t</table>\n";
	
	$count = count($rows);
	if ($count == 0){
		echo "<h3>I couldn't find any meetings!</h3>";
	} 

mysql_close($con);
?>
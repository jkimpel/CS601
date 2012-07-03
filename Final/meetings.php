<!doctype html>
<html lang="en">
<head>
	<title>Meeting Search Results</title>
	<meta charset="utf-8"/>
	<link href="nerna_style.css" type="text/css" rel="stylesheet"/>
</head>
<body>
	<h1>Here are the meetings I found for you:</h1>
	<?php
		function dayOfWeek($d){
			switch ($d){
  			case 0:
  				return "Sunday";
  				break;
  			case 1:
  				return "Monday";
  				break;
  			case 2:
  				return "Tuesday";
  				break;
  			case 3:
  				return "Wednesday";
  				break;
  			case 4:
  				return "Thursday";
  				break;
  			case 5:
  				return "Friday";
  				break;
  			case 6:
  				return "Saturday";
  				break;
  			default:
  				return "N/A";
  				break;
  			}
		}
	
		$con = mysql_connect("localhost","736253_root","cs601");
		if (!$con)
  		{
  			die('Could not connect: ' . mysql_error());
  		}

		mysql_select_db("jkcs601_zxq_nerna", $con);
		
		$day = $_GET['day'];
		$isOpen = $_GET['isOpen'];
		
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
		
		echo "<h2>" . $qstring . "</h2>";
		
		$result = mysql_query($qstring);	
		
		$count = 0;
		
		echo "<table>\n";
		
		echo "\t\t<tr>\n\t\t\t<th>Name</th>\n\t\t\t<th>Day</th>\n\t\t\t<th>Time</th>\n";
		echo "\t\t\t<th>Address</th>\n\t\t\t<th>Zip</th>\n\t\t\t<th>Open?</th>\n\t\t</tr>\n";
		
		while($row = mysql_fetch_array($result))
  		{
  			$count++;
  			echo "\t\t<tr>\n";
  			echo "\t\t\t<td>" . $row['Name'] . "</td>\n";
  			echo "\t\t\t<td>" . dayOfWeek($row['Day']) . "</td>\n";
  			echo "\t\t\t<td> " . $row['Time'] . "</td>\n";
  			echo "\t\t\t<td> " . $row['Address'] . "</td>\n";
  			echo "\t\t\t<td> " . $row['Zip'] . "</td>\n";
  			if ($row['IsOpen']==1)
  			{
  				echo "\t\t\t<td>Open</td>\n";
  			}
  			else
  			{
  				echo "\t\t\t<td>Closed</td>\n";
  			}
  			echo "\t\t</tr>\n";
  		}
  		
  		echo "\t</table>\n";
  		
  		if ($count==0){
  			echo "<h2>I couldn't find any meetings!</h2>";
  		} else{
  			echo "<h2>Returned " . $count . " results</h2>";
  		}

mysql_close($con);
?>
	<div class="back"><a href="nerna.html">Try another Search</a></div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
</body>
</html>
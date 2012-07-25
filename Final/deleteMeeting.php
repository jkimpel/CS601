<?php	
		$id = $_GET['id'];
		
		$sql1 = "SELECT * FROM Meeting where id = $id";
		
		$sql2 = "DELETE FROM Meeting where id = $id";
		
		$con = mysql_connect("localhost","736253_root","cs601");
		if (!$con)
		{
			die('Could not connect: ' . mysql_error());
		}

		mysql_select_db("jkcs601_zxq_nerna", $con);
		
		$result = mysql_query($sql1);	
		$row = mysql_fetch_array($result);
		
		$name = $row['Name'];
		
		if (!mysql_query($sql2, $con)){
			die('Unable to Delete: ' . mysql_error());
		}
		
		mysql_close($con);
		
		echo '<h3>Deleted Meeting "'.$name.'"</h3>';
?>
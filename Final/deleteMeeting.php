<?php	
		$id = $_GET['id'];
		$name = $_GET['name'];
		
		$sql = "DELETE FROM Meeting where id = $id";
		
		$con = mysql_connect("localhost","736253_root","cs601");
		if (!$con)
		{
			die('Could not connect: ' . mysql_error());
		}

		mysql_select_db("jkcs601_zxq_nerna", $con);
		
		if (!mysql_query($sql, $con)){
			die('Unable to Delete: ' . mysql_error());
		}
		
		mysql_close($con);
		
		echo '<h3>Deleted Meeting "'.$name.'"</h3>';
?>
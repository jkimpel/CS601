<?php
	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
//	deleteMeeting.php
//		This file is used to delete a meeting from the database, if the user is logged in
//
//		Note: it should not be loaded directly, but via an ajax request from main.php
//
	session_start();
	if ($_SESSION['auth'] == 1){
	
		$id = $_GET['id'];
		
		$pattern = '/^\d+$/';
		if (!preg_match($pattern, $id)){
			echo '<h3 class="styled">Bad input: '.$id.'</h3>';
		} else{
			$sql1 = "SELECT * FROM Meeting where id = $id";
			$sql2 = "DELETE FROM Meeting where id = $id";
			
			include 'db.php';
			$result = mysql_query($sql1);	
			$row = mysql_fetch_array($result);
			
			if ($row == false){
				echo '<h3 class="styled">Failed to find Meeting with id: '.$id.'</h3>';
			}else{
				$name = $row['Name'];
				if (!mysql_query($sql2, $con)){
					die('Unable to Delete: ' . mysql_error());
				}
				echo '<h3 class="styled">Deleted Meeting "'.$name.'"</h3>';
			}
			mysql_close($con);
		}
	} else {
		echo '<h3 class="styled">You must be logged in to do that!</h3>';
	}
?>
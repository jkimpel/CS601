<?php
	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
//	db.php
//		This shared file initiates connection to the database
	
	$con = mysql_connect("localhost","736253_root","cs601");
	if (!$con)
	{
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("jkcs601_zxq_nerna", $con);
?>
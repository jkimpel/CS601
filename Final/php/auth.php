<?php
	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
	
//	auth.php
//		This logs in (or logs out) an administrative user and stores a session variable
//		to keep track.
//		
//		Note: this is in no way secure, as it uses HTTP, GET, 
//			and a hard-coded dictionary-word password
//	
//		Note: it should not be loaded directly, but via an ajax request from main.php
//		
	
	session_start();
	$_SESSION['auth'] = -1;
	$uname = $_GET['uname'];
	$password = $_GET['password'];
	if (($uname == 'admin') && ($password == 'admin')){
		$_SESSION['auth'] = 1;
		echo 'Success';
	} else {
		echo 'Failure';
	}
?>
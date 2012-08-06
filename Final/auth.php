<?php
	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
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
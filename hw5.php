<!doctype html>
<!--
	Joe Kimpel
	HW5
	CS 601
	7.21.2012
-->
<html lang="en">
<head>
	<title>Joe K's Homework 5 - Response</title>
	<meta charset="utf-8"/>
	<link href="style.css" type="text/css" rel="stylesheet"/>
</head>
<body>
	<?php
		
		function validateName($n){
			$pattern = '/^.{5,}$/';
			if (preg_match($pattern, $n)){
				return True;
			} else{
				return False;
			}
		}
		
		function validateZip($z){
			$pattern = '/^\d{5}$/';
			if (preg_match($pattern, $z)){
				return True;
			} else{
				return False;
			}
		}
	
		$name = $_GET['name'];
		$zip = $_GET['zip'];
		$email = $_GET['emailAddress'];
	?>
	<h1>Thanks!</h1>
	<div>I got:
		<ul>
			<li>Name: <?= $name?></li>
			<li>Zip: <?= $zip?></li>
			<li>Email: <?= $email?></li>
		</ul>
	</div>
	<div>
		<?php
			if (validateName($name)){
				echo "<span class='pass'>Name: $name passes validation.</span>";
			} else{
				echo "<span class='fail'>Name: $name fails validation.</span>";
			}
		?>
	</div>
	<div>
		<?php
			if (validateZip($zip)){
				echo "<span class='pass'>Zip: $zip passes validation.</span>";
			} else{
				echo "<span class='fail'>Zip: $zip fails validation.</span>";
			}
		?>
	</div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
</body>
</html>
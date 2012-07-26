<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>New Meeting</title>
	<link rel="stylesheet" href="jquery-ui-1.8.21.custom/css/ui-lightness/jquery-ui-1.8.21.custom.css">
	<?php
		include("Mobile_Detect.php");
		$detect = new Mobile_Detect();
		if ($detect->isMobile()){
			echo '<link href="nerna_style_m.css" type="text/css" rel="stylesheet"/>';
		}else{
			echo '<link href="nerna_style.css" type="text/css" rel="stylesheet"/>';
		}
	?>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
  	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.js"></script>
  	<script src="newMeeting.js"></script>
</head>
<body>
	<h1>Add a new meeting</h1>
	<form name='newMeetingForm' id='newMeetingForm' method="get" action="addMeeting.php">

		<div class='form'>Meeting Name:
			<input id='name' name='name' type='text'/>
		</div>
		<div class='form'>Day of week:
			<select id="day" name="day">
				<option value="0">Sunday</option>
				<option value="1">Monday</option>
				<option value="2">Tuesday</option>
				<option value="3">Wednesday</option>
				<option value="4">Thursday</option>
				<option value="5">Friday</option>
				<option value="6">Saturday</option>
			</select>
		</div>
		<div class='form'>Time:
			<input id='time' name='time' type='text'/>
		</div>
		<div class='form'>Address:
			<input id='address' name='address' type='text'/>
		</div>
		<div class='form'>Town:
			<input id='town' name='town' type='text'/>
		</div>
		<div class='form'>Type of Meeting:
			<select id="isOpen" name="isOpen">
				<option value="1">Open</option>
				<option value="0">Closed</option>
			</select>
		</div>
		<input type='hidden' id='lat' name='lat'/>
		<input type='hidden' id='lng' name='lng'/>
		<div class='form' id='dmap'></div>
		<div class='form'>
			<div id='status'></div>
			<button id='validateButton'>Validate!</button>
			<button id='submitButton'>Submit</button>
			<button id='editButton'>Edit</button>
		</div>
	</form>
	<div class="back"><a class="linkButton" href="index.php">Go to Meeting Search</a></div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
</body>
</html>
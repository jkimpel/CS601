<!doctype html>
<!--*********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************-->
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Meeting Finder</title>
	<link rel="stylesheet" href="jquery-ui-1.8.22.custom/css/overcast/jquery-ui-1.8.22.custom.css">
	<?php
		include("Mobile_Detect.php");
		$detect = new Mobile_Detect();
		$mbl = $detect->isMobile();
		if ($mbl){
			echo '<link href="css/style_m.css" type="text/css" rel="stylesheet"/>';
			echo '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">';
		}else{
			echo '<link href="css/style.css" type="text/css" rel="stylesheet"/>';
		}
	?>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
  	<script src="jquery-ui-1.8.22.custom/js/jquery-ui-1.8.22.custom.min.js"></script>
  	<script src="js/add.js"></script>
  	<script src="js/calc.js"></script>
  	<script src="js/history.js"></script>
  	<script src="js/admin.js"></script>
  	<script src="js/search.js"></script>
  	<script src="js/setup.js"></script>
</head>
<body>
	<h1>Meeting Finder</h1>
	<div id="navTabs">
		<ul>
			<?php
				if ($mbl){
					echo '<li><a href="#navtabs-1">Find</a></li>';
					echo '<li><a href="#navtabs-2">Add</a></li>';
					echo '<li><a href="#navtabs-3">Time</a></li>';
				}else{
					echo '<li><a href="#navtabs-1">Find Meeting</a></li>';
					echo '<li><a href="#navtabs-2">Add Meeting</a></li>';
					echo '<li><a href="#navtabs-3">Calculate Time</a></li>';
				}
			?>
		</ul>
		<div id="navtabs-1">
			<div class='formLeft'>
				<div class='forma'>
					<h4>Location</h4>
					<div id="locTabs">
						<ul>
							<?php
								if ($mbl){
									echo '<li><a href="#tabs-1">A</a></li>';
									echo '<li><a href="#tabs-2">M</a></li>';
									echo '<li><a href="#tabs-3">R</a></li>';
								}else{
									echo '<li><a href="#tabs-1">Auto</a></li>';
									echo '<li><a href="#tabs-2">Manual</a></li>';
									echo '<li><a href="#tabs-3">Recent</a></li>';
								}
							?>					
						</ul>
						<div id="tabs-1">
							<div class="autolocate">Try Automatic Location</div>
							<div><button id="locate" onclick="clickLocate()">Locate Me!</button></div>
						</div>
						<div id="tabs-2">
							<div>
								Location: <input type="text" id="location" name="location"/>
							</div>
							<div>
								<button id="submit" onclick="clickSubmit()">Submit!</button>
							</div>
						</div>
						<div id="tabs-3">
							<div class="recent">
								<div>No recent locations!</div>
							</div>
							<div><button id="clear" onclick="clearHistory()">Clear History</button></div>
						</div>
					</div>
					<h4>Location: <span class="town">None</span></h4>
				</div>
				<form id="query">
					<div class='forma'>
						<h4>Choose a day:</h4>
						<select class="submitter" id="fday" name="day">
							<option value="7">Any Day</option>
							<option value="0">Sunday</option>
							<option value="1">Monday</option>
							<option value="2">Tuesday</option>
							<option value="3">Wednesday</option>
							<option value="4">Thursday</option>
							<option value="5">Friday</option>
							<option value="6">Saturday</option>
						</select>
					</div>
					<div class='forma'>
						<h4>Type of Meeting:</h4>
						<select class="submitter" name="isOpen">
							<option value="2">Either</option>
							<option value="1">Open</option>
							<option value="0">Closed</option>
						</select>
					</div>
					<div class='forma'>
						<h4>Sort By:</h4>
						<select class="submitter" id="sort" name="sort">
							<option value="w">Day/Time</option>
							<option value="t">Town</option>
						</select>
					</div>
					<input name="lat" id="flat" type="hidden" value="0"/>
					<input name="long" id="flong" type="hidden" value="0"/>
					<input name="admin" id="admin" type="hidden" value="0"/>
				</form>
				<div class='forma'>
					<button onclick="ajaxTable()">Search!</button>
					<button id="setAdmin">Enable Admin</button>
				</div>
			</div>
			<div class="formRight">
				<div class="forma">
					<h3>Results:</h3>
					<div id="results">
						Click Search!
					</div>
				</div>
			</div>
			<div class="footer"></div>
			<div id="deleteDialog" title="Delete Confirmed"></div>
			<div id="explainDialog" title="Meeting Type Info"></div>
			<div id="authDialog" title="Authenticate">
				<table>
				<tr><td>Username:</td><td><input type="text" id="uname"/></td></tr>
				<tr><td>Password:</td><td><input type="password" id="pass"/></td></tr>
				</table>
				<div id="authFeedback"></div>
			</div>
		</div>
		<div id="navtabs-2">
			<form name='newMeetingForm' id='newMeetingForm' onsubmit='return validate()'>
				<div class='formLeft'>
					<div class='forma'><span class="label">Meeting Name:</span>
						<input id='name' name='name' type='text'/>
					</div>
					<div class='forma'><span class="label">Day of week:</span>
						<select id="aday" name="day">
							<option value="0">Sunday</option>
							<option value="1">Monday</option>
							<option value="2">Tuesday</option>
							<option value="3">Wednesday</option>
							<option value="4">Thursday</option>
							<option value="5">Friday</option>
							<option value="6">Saturday</option>
						</select>
					</div>
					<div class='forma'><span class="label">Time:</span>
						<input id='time' name='time' type='text'/>
					</div>
					<div class='forma'><span class="label">Address:</span>
						<input id='address' name='address' type='text'/>
					</div>
					<div class='forma'><span class="label">Town:</span>
						<input id='town' name='town' type='text'/>
					</div>
					<div class='forma'><span class="label">Type of Meeting:</span>
						<select id="isOpen" name="isOpen">
							<option value="1">Open</option>
							<option value="0">Closed</option>
						</select>
					</div>
				</div>
				<div class='formRight'>
					<div class='forma' id='dmap'>
						Enter Meeting Details!
					</div>
					<div class='forma'>
						<div id='status'></div>
						<button id='validateButton'>Validate!</button>
						<button id='submitButton'>Submit</button>
						<button id='editButton'>Edit</button>
					</div>
				</div>
				<input type='hidden' id='alat' name='lat'/>
				<input type='hidden' id='alng' name='lng'/>
			</form>
			<div id="confirmDialog" title="Meeting Added"></div>
			<div id="alertDialog" title="Clarification Needed"></div>
			<div class="footer"></div>
		</div>
		<div id="navtabs-3">
			<div class="form">
				Enter Clean Date:
				<input type="text" id="datepicker"/>
			</div>
			<div class="form">
				<div id="timeResults"></div>
			</div>
			<div class="form">
				<div id="keytag"></div>
			</div>
		</div>
	</div>
	<div class="footer">Contact: <a href="mailto:jmkimpel@bu.edu">jmkimpel@bu.edu</a></div>
	<div class="footer"><small>&copy;Joe Kimpel 2012</small></div>
	<div id="detect"><div class="footer">Mobile Detected!</div></div>
</body>
</html>
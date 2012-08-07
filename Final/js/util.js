	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
	
//	util.js
//		Some shared utility functions
	
//This is like an alert, but uses a jquery modal dialog, and directs the user somewhere after it is closed
function neatAlert(feedback, direct){
	$("#alertDialog").html(feedback);
	$("#alertDialog").dialog({
		modal: true,
		buttons: {
			OK: function(){
				$(this).dialog("close");
				$(direct).focus();
			}
		}
	});
}

function dayOf(num){
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	return days[num];
}

//This function takes a string (from user input) and converts it to
//	a URL to use google's geocoding through yql to get latitude and longitude
function getGeocodeUrl(input){
	var inpts = input.split(" ");
	var inptf = inpts[0];
	for (i = 1; i < inpts.length; i++){
		inptf = inptf + "%2B" + inpts[i];
	}
	//Using YQL allows us to bypass the same-origin policy
	return "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3D" 
		+ inptf + "%26sensor%3Dtrue%22&format=json&diagnostics=true";
}
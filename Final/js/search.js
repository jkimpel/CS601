/*  *********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
//	search.js
//		This file handles the 'Find Meeting' tab of main.php


//This handles manually typed locations
function clickSubmit(){
	var locale = $("#location").val();
	var locurl = getGeocodeUrl(locale);
	var zip = null;
	
	$.getJSON(locurl, function(locResponse) {

		//See this url for an explanation of the JSON results:
		//	https://developers.google.com/maps/documentation/geocoding/#JSON
		if (locResponse.query.results.json.status == "OK" && locResponse.query.results.json.results.geometry != null){
			processLatLong(locResponse.query.results.json.results.geometry.location.lat, 
				locResponse.query.results.json.results.geometry.location.lng);
		} else {
			neatAlert("Unable to process location! Try again or use locate me!", "#location");
		}
	});
}

//This handles auto-location
//	basic reference: http://www.w3schools.com/html5/html5_geolocation.asp
function clickLocate(){
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	$('#autolocate').html("Attempting geolocation...");
}

//called when geolocation succeeds
function successCallback(position){
	$('#autolocate').html("Geolocation Suceeded");
	processLatLong(position.coords.latitude, position.coords.longitude);
}

//called when geolocation fails
function errorCallback(error){
	neatAlert("GeoLocation failed!");
	$('#autolocate').html("Unable to retrieve location :-(");
}

//Once we have the location to a latitude & longitude, this method handles it
function processLatLong(lat, lng){
	$('#flat').val(lat);
	$('#flong').val(lng);
	$('span.town').html("Processing...");
	
	//Using YQL allows us to bypass the same-origin policy
	var zipurl =
		"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Flatlng%3D" 
		+ lat + "%2C" + lng + "%26sensor%3Dtrue%22&format=json&diagnostics=true";
	var zip = null;
	var town = null;
	var country = null;
	$.getJSON(zipurl, function(zipResponse) {
	
		//See this url for an explanation of the JSON results:
		//	https://developers.google.com/maps/documentation/geocoding/#JSON
		try{
			for (var i = 0; i < zipResponse.query.results.json.results.length; i++){
				for (var j = 0; j < zipResponse.query.results.json.results[i].address_components.length; j++){
					if (zipResponse.query.results.json.results[i].address_components[j].types[0] == "country"){
						country = zipResponse.query.results.json.results[i].address_components[j].short_name;
					}
					if (zipResponse.query.results.json.results[i].address_components[j].types == "postal_code"){
						zip = zipResponse.query.results.json.results[i].address_components[j].long_name;
					}
				}
				if (zipResponse.query.results.json.results[i].types[0] == "administrative_area_level_3" ||
					zipResponse.query.results.json.results[i].types[0] == "locality"){
						town = zipResponse.query.results.json.results[i].formatted_address;
				}
			}
		} catch (err){
			//Any errors we can ignore
		}
		if (country == "US" && zip != null){
			$('span.town').html(town);
			enableDistanceSort();
			ajaxTable();
			updateHistory(lat, lng, town);
		} else {
			neatAlert("Sorry! Unable to process your location.", "");
			var nlat = new Number(lat);
			var nlng = new Number(lng);
			$('span.town').html("" + nlat.toPrecision(4) + "," + nlng.toPrecision(4));
			enableDistanceSort();
			ajaxTable();
		}
	});
}

//This method retrieves information about meetings from the server & formats them
function ajaxTable(){
	$.get("php/findMeetings.php", $("#query").serialize(), function(data){
		$("#results").html(data);
		$("div.result").show();
		$("button").button();
		$("a.linkButton").button();
		$("#dataAccordion").accordion({
			active: false,
			icons: false,
			autoheight: true,
			collapsible: true
		});
	});
}
	
//Simple method to explain what an open meeting is
function explainOpen(){
		$("#explainDialog").html("Open Meetings are open to the public.");
		$("#explainDialog").dialog({
			modal:true,
			buttons: {
				OK: function(){
					$(this).dialog("close");
				}	
			}
		});
}

//Simple method to explain what a closed meeting is
function explainClosed(){
		$("#explainDialog").html("Closed Meetings are for Narcotics Anonymous members only.");
		$("#explainDialog").dialog({
			modal:true,
			buttons: {
				OK: function(){
					$(this).dialog("close");
				}	
			}
		});
}

//This method enables sorting the results by distance from the user's location
function enableDistanceSort(){
	if (!located){
		$("#sort").append("<option value='d'>Distance</option>");
		located = true;
	}
}
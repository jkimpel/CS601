var accOpts = {
	active: false
};

function clickSubmit(){
	var locale = $("#location").val();
	var inpts = locale.split(" ");
	var inptf = inpts[0];
	for (i = 1; i < inpts.length; i++){
		inptf = inptf + "%2B" + inpts[i];
	}

	var locurl =
		"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3D" 
		+ inptf + "%26sensor%3Dtrue%22&format=json&diagnostics=true";
		
	var zip = null;
	$.getJSON(locurl, function(locResponse) {
		if (locResponse.query.results.json.status == "OK" && locResponse.query.results.json.results.geometry != null){
			processLatLong(locResponse.query.results.json.results.geometry.location.lat, 
				locResponse.query.results.json.results.geometry.location.lng);
		} else {
			alert("Unable to process location! Try again or use locate me!");
		}
	});
}

function clickLocate(){
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
	$('div.autolocate').html("<div>Attempting geolocation...</div>");
}

//called when geolocation fails
function successCallback(position){
	$('div.autolocate').html("<div>Geolocation Suceeded</div>");
	processLatLong(position.coords.latitude, position.coords.longitude);
}

//called when geolocation fails
function errorCallback(error){
	alert("GeoLocation failed! " + error.message);
	$('div.autolocate').html("<div>Unable to retrieve location :-(</div>");
}

function processLatLong(lat, lng){
	$('span.lat').html(lat);
	$('span.long').html(lng);
	$('#lat').val(lat);
	$('#long').val(lng);
	var zipurl =
		"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Flatlng%3D" 
		+ lat + "%2C" + lng + "%26sensor%3Dtrue%22&format=json&diagnostics=true";
	var zip = null;
	var town = null;
	var country = null;
	$.getJSON(zipurl, function(zipResponse) {
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
			$('span.zip').html(zip);
		} else {
			alert("Sorry! Unable to process your location.");
		}
	});
}

$(document).ready(function() {
	$("#myAccordion").accordion(accOpts);
});
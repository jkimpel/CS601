var accOpts = {
	active: false,
	collapsible: true
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
			ajaxTable();
			updateHistory(lat, lng, town);
		} else {
			alert("Sorry! Unable to process your location.");
		}
	});
}

function updateHistory(lat, lng, town){

	if ((town != localStorage.recentName0) && 
		(town != localStorage.recentName1) && 
		(town != localStorage.recentName2)){
		localStorage.recentName2 = localStorage.recentName1;
		localStorage.recentLat2 = localStorage.recentLat1;
		localStorage.recentLng2 = localStorage.recentLng1;
		localStorage.recentName1 = localStorage.recentName0;
		localStorage.recentLat1 = localStorage.recentLat0;
		localStorage.recentLng1 = localStorage.recentLng0;
		localStorage.recentName0 = town;
		localStorage.recentLat0 = lat;
		localStorage.recentLng0 = lng;
		refreshHistory();
	}
}

//Clear the user's search history
function clearHistory(){
	localStorage.recentName0 = "undefined";
	localStorage.recentName1 = "undefined";
	localStorage.recentName2 = "undefined";
	refreshHistory();
}

//Display the history
function refreshHistory(){
	var nameHistory = new Array(3);
	nameHistory[0] = localStorage.recentName0;
	nameHistory[1] = localStorage.recentName1;
	nameHistory[2] = localStorage.recentName2;
	if (nameHistory[0] == null || nameHistory[0] == "undefined"){
		$('div.recent').html("<div>No recent locations!</div>");
	} else{
		$('div.recent').html("");
		for (i = 0; i < 3; i++){
			if (nameHistory[i] != null && nameHistory[i] != "undefined"){
				$("div.recent").append("<div><button onclick=\"locFromHistory('" + i + 
										"')\">" + nameHistory[i] + "</button></div>");
			}
		}
	}
}

function locFromHistory(index){
	var hlat, hlng, hname;
	switch (index){
		case '0':
			hlat = localStorage.recentLat0;
			hlng = localStorage.recentLng0;
			hname = localStorage.recentName0;
		break;
		case '1':
			hlat = localStorage.recentLat1;
			hlng = localStorage.recentLng1;
			hname = localStorage.recentName1;
		break;
		case '2':
			hlat = localStorage.recentLat2;
			hlng = localStorage.recentLng2;
			hname = localStorage.recentName2;
		break;
	}
	$('span.lat').html(hlat);
	$('span.long').html(hlng);
	$('#lat').val(hlat);
	$('#long').val(hlng);
	$('span.town').html(hname);
	ajaxTable();
}

function ajaxTable(){
	$.get("meetings_ajax.php", $("form").serialize(), function(data){
		$("#results").html(data);
		$("button").button();
	});
}

function setToday(){
	var d = new Date();
	var today = d.getDay();
	var tomorrow = (today + 1) % 7;
	$("#day").val(today);
	$("option[value="+today+"]").html("Today");
	$("option[value="+tomorrow+"]").html("Tomorrow");
}

function deleteMeeting(id){
	$.get("deleteMeeting.php", "id="+id, function(data){
		ajaxTable();
		$("#deleteDialog").html(data);
		$("#deleteDialog").dialog({
			modal:true,
			buttons: {
				OK: function(){
					$(this).dialog("close");
				}	
			}
		});
	});
}
			

$(document).ready(function() {
	refreshHistory();
	$("button").button();
	setToday();
	$("#myAccordion").accordion(accOpts);
	$("#setAdmin").click(function(event){
		event.preventDefault();
		var admin = $("#admin").val();
		if (admin != 0){
			$("#admin").val(0);
			$("#setAdmin").html("Enable Admin");
		}else{
			$("#admin").val(1);
			$("#setAdmin").html("Disable Admin");
		}
	});
	$(".submitter").change(function(){
		ajaxTable();
	});
});
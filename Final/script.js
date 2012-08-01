var accOpts = {
	active: false,
	autoheight: true,
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
	$('#flat').val(lat);
	$('#flong').val(lng);
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
			enableDistanceSort();
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
	$('#flat').val(hlat);
	$('#flong').val(hlng);
	$('span.town').html(hname);
	enableDistanceSort();
	ajaxTable();
}

function ajaxTable(){
	$.get("meetings_acc.php", $("#query").serialize(), function(data){
		$("#results").html(data);
		$("div.result").show();
		$("button").button();
		$("a.linkButton").button();
		$("#dataAccordion").accordion(accOpts);
	});
}

function setToday(){
	var d = new Date();
	var today = d.getDay();
	var tomorrow = (today + 1) % 7;
	$("#fday").val(today);
	$("#fday > option[value="+today+"]").html("Today");
	$("#fday > option[value="+tomorrow+"]").html("Tomorrow");
}

function enableAdmin(){
	var admin = $("#admin").val();
	if (admin != 0){
		$("#admin").val(0);
		$("#setAdmin span").html("Enable Admin");
		$("#setAdmin").button();
	}else{
		$("#authDialog").dialog({
			modal: true,
				buttons: {
					Cancel: function(){
						$("#uname").val("");
						$("#pass").val("");
						$(this).dialog("close");
					},
					Authenticate: function(){
						var u = $("#uname").val();
						var p = $("#pass").val();
						if ((u == 'admin') && (p == 'admin')){
							$("#admin").val(1);
							$("#setAdmin span").html("Disable Admin");
							$("#setAdmin").button();
							$("#uname").val("");
							$("#pass").val("");
							$(this).dialog("close");
							ajaxTable();
						}else{
							$("#authFeedback").show();
							$("#authFeedback").html("<span class='highlight'>Auth Failed!</span>");
							$(this).parent().effect('shake',{times:4}, 120, function(){
								$("#authFeedback").fadeOut(3000);
							});
							$("#uname").val("");
							$("#pass").val("");
						}
					}
				}
		
		});
	}
	ajaxTable();
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

function enableDistanceSort(){
	if (!located){
		$("#sort").append("<option value='d'>Distance</option>");
		located = true;
	}
}

function validate(){
	var namePattern= /^.{3,}$/g;
	if  (!namePattern.test($("#name").val())) {
		alert("Please enter at least a three character name.");
		$("#name").focus();
  		return  false;
 	}
	var timePattern= /^(0?[1-9]|1[012])(:[0-5]\d)?(am|AM|pm|PM)?$/g;
	if  (!timePattern.test($("#time").val())) {
		alert("Please enter a valid time.");
		$("#time").focus();
  		return  false;
 	}
 	var address = $("#address").val();
 	var addressPattern = /^.{3,}?/g;
 	if (!addressPattern.test(address)){
 		alert("Please enter at least a three character address.");
 		$("#address").focus();
 		return false;
 	}
 	var town = $("#town").val();
 	var townPattern = /^.{3,}?/g;
 	if (!townPattern.test(town)){
 		alert("Please enter at least a three character town.");
 		$("#town").focus();
 		return false;
 	}
 	var fullAddress = address + " " + town + ", MA";
 	var inpts = fullAddress.split(" ");
	var inptf = inpts[0];
	for (i = 1; i < inpts.length; i++){
		inptf = inptf + "%2B" + inpts[i];
	}

	var locurl =
		"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3D" 
		+ inptf + "%26sensor%3Dtrue%22&format=json&diagnostics=true";
	$.getJSON(locurl, function(locResponse) {
		if (locResponse.query.results.json.status == "OK" && locResponse.query.results.json.results.geometry != null){
			var rlat = locResponse.query.results.json.results.geometry.location.lat;
			var rlng = locResponse.query.results.json.results.geometry.location.lng;
			$("#alat").val(rlat); 
			$("#alng").val(rlng);
			$("#status").html("Ready To Submit!");
			$("#dmap").html('<iframe width="250" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q='+rlat+','+rlng+'&amp;num=1&amp;t=m&amp;ie=UTF8&amp;z=15&amp;ll='+rlat+','+rlng+'&amp;output=embed"></iframe>');
			$("#submitButton").show();
			$("#editButton").show();
		} else {
			alert("Unable to process location! Try again!");
			unfreeze();
		}
	});
	freeze();
	return false;
}

function freeze(){
	$("#status").html("Looking Up Location...");
	$("#name").attr('readonly', true);
	$("#time").attr('readonly', true);
	$("#address").attr('readonly', true);
	$("#town").attr('readonly', true);
	compactDaySelect();
	compactIsOpenSelect();
	$("#validateButton").hide();
}

function unfreeze(){
	$("#status").html("Awaiting Input");
	$("#name").attr('readonly', false);
	$("#time").attr('readonly', false);
	$("#address").attr('readonly', false);
	$("#town").attr('readonly', false);
	expandDaySelect();
	expandIsOpenSelect();
	$("#validateButton").show();
	$("#editButton").hide();
	$("#submitButton").hide();
}

function compactDaySelect(){
	var state = $("#aday").val();
	$("#aday").html("<option value='"+state+"'>"+dayOf(state)+"</option>");
}

function expandDaySelect(){
	var state = $("#aday").val();
	$("#aday").html("");
	for (var i = 0; i < 7; i++){
		$("#aday").append("<option value='"+i+"'>"+dayOf(i)+"</option>");
	}
	$("#aday").val(state);
}

function dayOf(num){
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	return days[num];
}

function compactIsOpenSelect(){
	var state = $("#isOpen").val();
	if (state == "1")
		$("#isOpen").html("<option value='1'>Open</option>");
	else
		$("#isOpen").html("<option value='0'>Closed</option>");
}

function expandIsOpenSelect(){
	var state = $("#isOpen").val();
	$("#isOpen").html("<option value='1'>Open</option><option value='0'>Closed</option>");
	$("#isOpen").val(state);
}

function ajaxData(){
	$.get("addMeeting.php", $("#newMeetingForm").serialize(), function(data){
		$("#confirmDialog").html(data);
		$("#confirmDialog").dialog({
			modal:true,
			buttons: {
				OK: function(){
					resetForm();
					$(this).dialog("close");
				}	
			},
			close: function(){resetForm();}
			
		});
	});
}

function resetForm(){
	unfreeze();
	$("#name").val("");
	$("#time").val("");
	$("#address").val("");
	$("#town").val("");
	$("#time").val("");
	$("#isOpen").val("1");
	$("#aday").val("0");
	$("#dmap").html("");
}

function calcTime(){
	var date = new Date($("#datepicker").val());
	var now = new Date();
	var diff = now.getTime() - date.getTime();
	var diffDays = diff/ (1000 * 60 * 60 * 24);
	$("#timeResults").html("You have been clean " + Math.floor(diffDays) + " days!");
	var keytag = 0;
	test = new Date();
	test.setMonth(test.getMonth() -1);	
	if (test.getTime() > date.getTime()){
		keytag = 1;	//1months
	}	
	test = new Date();
	for (var i = 0; i < 2; i++)
		test.setMonth(test.getMonth() -1);	
	if (test.getTime() > date.getTime()){
		keytag = 2;	//2months
	}	
	test = new Date();
	for (var i = 0; i < 3; i++)
		test.setMonth(test.getMonth() -1);	
	if (test.getTime() > date.getTime()){
		keytag = 3;	//3months
	}	
	test = new Date();
	for (var i = 0; i < 6; i++)
		test.setMonth(test.getMonth() -1);	
	if (test.getTime() > date.getTime()){
		keytag = 4;	//6months
	}	
	test = new Date();
	for (var i = 0; i < 9; i++)
		test.setMonth(test.getMonth() -1);	
	if (test.getTime() > date.getTime()){
		keytag = 5;	//9months
	}	
	test = new Date();
	test.setFullYear(test.getFullYear() - 1);
	if (test.getTime() > date.getTime()){
		keytag = 6;	//1year
	}	
	test = new Date();
	test.setFullYear(test.getFullYear() - 1);
	for (var i = 0; i < 6; i++)
		test.setMonth(test.getMonth() -1);	
	if (test.getTime() > date.getTime()){
		keytag = 7;	//18 months
	}
	var test = new Date();
	test.setFullYear(test.getFullYear() - 2);
	if (test.getTime() > date.getTime()){
		keytag = 8;	//multiple years
	}
	
	$("#keytag").html("<img src='img/nakeytag"+keytag+".jpg'/>");
}

$(document).ready(function() {
	located = false;
	refreshHistory();
	$("button").button();
	$("a.linkButton").button();
	setToday();
	$("#navTabs").tabs();
	$("#locTabs").tabs();
	$("#setAdmin").click(function(event){
		event.preventDefault();
		enableAdmin();
	});
	$("#datepicker").datepicker({
		changeMonth: true,
		changeYear: true,
		maxDate: 0,
		onSelect: function(){calcTime()}
	});
	$("#datepicker").focus(function(){
		$(this).blur();
	});
	$("#validateButton").click(function(event){
		event.preventDefault();
		validate();
	});
	$("#editButton").click(function(event){
		event.preventDefault();
		unfreeze();
	});
	$("#submitButton").click(function(event){
		event.preventDefault();
		ajaxData();
	});
	$(".submitter").change(function(){
		ajaxTable();
	});
});
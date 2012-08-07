	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
	
//	add.js
//		This file handles javascript for the 'Add Meeting' tab of main.php
	
//This function validates the user's input
//	which includes sending a geocoding query to determine lat/lng coordinates 
//	for the location the user specified
function validate(){
	var namePattern= /^.{3,}$/g;
	if  (!namePattern.test($("#name").val())) {
		neatAlert("Please enter at least a three character name.", "#name");
  		return  false;
 	}
	var timePattern= /^(0?[1-9]|1[012])(:[0-5]\d)?(am|AM|pm|PM)?$/g;
	if  (!timePattern.test($("#time").val())) {
		neatAlert("Please enter a valid time.", "#time");
  		return  false;
 	}
 	var address = $("#address").val();
 	var addressPattern = /^.{3,}?/g;
 	if (!addressPattern.test(address)){
 		neatAlert("Please enter at least a three character address.", "#address");
 		return false;
 	}
 	var town = $("#town").val();
 	var townPattern = /^.{3,}?/g;
 	if (!townPattern.test(town)){
 		neatAlert("Please enter at least a three character town.", "#town");
 		return false;
 	}
 	
 	var fullAddress = address + " " + town + ", MA";
	var locurl = getGeocodeUrl(fullAddress);
	
	//What we want here is a lat&lng pair to put in the database, so we can do distance based searches
	$.getJSON(locurl, function(locResponse) {
		if (locResponse.query.results.json.status == "OK" && locResponse.query.results.json.results.geometry != null){
			var rlat = locResponse.query.results.json.results.geometry.location.lat;
			var rlng = locResponse.query.results.json.results.geometry.location.lng;
			$("#alat").val(rlat); 
			$("#alng").val(rlng);
			$("#status").html("<h3 class='styled'>Ready To Submit!</h3>");
			$("#dmap").html('<iframe width="250" height="250" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q='+rlat+','+rlng+'&amp;num=1&amp;t=m&amp;ie=UTF8&amp;z=15&amp;ll='+rlat+','+rlng+'&amp;output=embed"></iframe>');
			/*
			 *	Note: the above iframe will cause javascript errors in Chrome as per http://code.google.com/p/chromium/issues/detail?id=43173
			 * 		These are a known, unfixed issue, and cause no problems
			 */
			$("#submitButton").show();
			$("#editButton").show();
		} else {
			neatAlert("Unable to process location! Try again!", "#address");
			unfreeze();
		}
	});
	freeze();
	return false;
}

//This function freezes the input once the user has started the validation process
function freeze(){
	$("#status").html("<h3 class='styled'>Looking Up Location...</h3>");
	$("#name").attr('readonly', true);
	$("#time").attr('readonly', true);
	$("#address").attr('readonly', true);
	$("#town").attr('readonly', true);
	compactDaySelect();
	compactIsOpenSelect();
	$("#validateButton").hide();
}

//This unfreezes the inputs
function unfreeze(){
	$("#status").html("<h3 class='styled'>Awaiting Input</h3>");
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

//This compacts the day select box down so it can't be changed
function compactDaySelect(){
	var state = $("#aday").val();
	$("#aday").html("<option value='"+state+"'>"+dayOf(state)+"</option>");
}

//This expands the day select box so it can once again be edited
function expandDaySelect(){
	var state = $("#aday").val();
	$("#aday").html("");
	for (var i = 0; i < 7; i++){
		$("#aday").append("<option value='"+i+"'>"+dayOf(i)+"</option>");
	}
	$("#aday").val(state);
}

//Compacts the meeting type select box
function compactIsOpenSelect(){
	var state = $("#isOpen").val();
	if (state == "1")
		$("#isOpen").html("<option value='1'>Open</option>");
	else
		$("#isOpen").html("<option value='0'>Closed</option>");
}

//expands the meeting type select box
function expandIsOpenSelect(){
	var state = $("#isOpen").val();
	$("#isOpen").html("<option value='1'>Open</option><option value='0'>Closed</option>");
	$("#isOpen").val(state);
}

//This method sends the info via ajax to the server
//	and displays the response in a dialog
function ajaxData(){
	$.get("php/addMeeting.php", $("#newMeetingForm").serialize(), function(data){
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

//This method clears out all the info the user put in the form
function resetForm(){
	unfreeze();
	$("#name").val("");
	$("#time").val("");
	$("#address").val("");
	$("#town").val("");
	$("#time").val("");
	$("#isOpen").val("1");
	$("#aday").val("0");
	$("#dmap").html("<h3 class='styled'>Enter Meeting Details!</h3>");
}


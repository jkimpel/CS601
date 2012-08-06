	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/

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
	$("#dmap").html("Enter Meeting Details!");
}


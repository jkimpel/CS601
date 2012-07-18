function validate(form){
	var namePattern= /^.{3,}$/g;
	if  (!namePattern.test(form.name.value)) {
		alert("Please enter at least a three character name.");
		form.name.focus();
  		return  false;
 	}
	var timePattern= /^(0?[1-9]|1[012])(:[0-5]\d)?(am|AM|pm|PM)?$/g;
	if  (!timePattern.test(form.time.value)) {
		alert("Please enter a valid time.");
		form.time.focus();
  		return  false;
 	}
 	var address = form.address.value + " " + form.town.value + ", MA";
 	var inpts = address.split(" ");
	var inptf = inpts[0];
	for (i = 1; i < inpts.length; i++){
		inptf = inptf + "%2B" + inpts[i];
	}

	var locurl =
		"http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fmaps.googleapis.com%2Fmaps%2Fapi%2Fgeocode%2Fjson%3Faddress%3D" 
		+ inptf + "%26sensor%3Dtrue%22&format=json&diagnostics=true";
	$.getJSON(locurl, function(locResponse) {
		if (locResponse.query.results.json.status == "OK" && locResponse.query.results.json.results.geometry != null){
			$("#status").html("Success!");
			$("#lat").val(locResponse.query.results.json.results.geometry.location.lat); 
			$("#lng").val(locResponse.query.results.json.results.geometry.location.lng);
			$("#dlat").html(locResponse.query.results.json.results.geometry.location.lat); 
			$("#dlng").html(locResponse.query.results.json.results.geometry.location.lng);
		} else {
			alert("Unable to process location! Try again!");
		}
	});
	$("#status").html("Working...");
	$("#name").attr('readonly', true);
	$("#time").attr('readonly', true);
	$("#address").attr('readonly', true);
	$("#town").attr('readonly', true);
	$("#name").attr('readonly', true);
	$("#day").attr('readonly', 'readonly');
	$("#isOpen").attr('readonly', 'readonly');
	return false;
}
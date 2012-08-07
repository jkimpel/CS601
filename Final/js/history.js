	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
//	history.js
//		This file handles handles the user's location history,
//		all of which is stored client-side using HTML5 local storage
//		(There was no need for the server to be aware of the location
//		so this was a better option than cookies to reduce bandwidth)
//		Note: local storage does not support arrays, thus the slightly
//			cumbersome code here

//Add a new location to history
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

//set the location based on a saved location
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
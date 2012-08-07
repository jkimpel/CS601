	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/
//	calc.js
//		This file handles javascript for the 'Calculate Time' tab

//Called when a date is selected
function calcTime(){
	var date = new Date($("#datepicker").val());
	var now = new Date();
	var diff = now.getTime() - date.getTime();
	var diffDays = Math.floor(diff/ (1000 * 60 * 60 * 24));
	if (diffDays == 0){
		$("#timeResults").html("<h3 class='styled'>Welcome to Narcotics Anonymous! Now go find a meeting!</h3>");
	} else if (diffDays == 1){
		$("#timeResults").html("<h3 class='styled'>The first 24 hours are the hardest part. Keep it up!</h3>");
	} else {
		$("#timeResults").html("<h3 class='styled'>Congratulations! You have been clean " + diffDays + " days!</h3>");
	}
	var keytag = 0;
	test = new Date();
	test = new Date(test.getTime() - 30*24*60*60*1000);	
	if (test.getTime() > date.getTime()){
		keytag = 1;	//30 Days
	}	
	test = new Date();
	test = new Date(test.getTime() - 60*24*60*60*1000);	
	if (test.getTime() > date.getTime()){
		keytag = 2;	//60 days
	}	
	test = new Date();
	test = new Date(test.getTime() - 90*24*60*60*1000);
	if (test.getTime() > date.getTime()){
		keytag = 3;	// 90 days
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
	$("#keytag").html("<img class='mine' src='img/nakeytag"+keytag+".jpg' alt='Your Keytag!'/>");
	$("#keytag").append("<h3 class='styled'>Your Keytag!</h3>");
}
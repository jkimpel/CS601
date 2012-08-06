	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/

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
	$("#keytag").html("<img src='img/nakeytag"+keytag+".jpg' alt='Your Keytag!'/>");
}
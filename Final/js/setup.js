/*  *********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/

//This little function converts the option labels from static
//	to dynamically naming today and tomorrow
//	and defaulting to today
function setToday(){
	var d = new Date();
	var today = d.getDay();
	var tomorrow = (today + 1) % 7;
	$("#fday").val(today);
	$("#fday > option[value="+today+"]").html("Today");
	$("#fday > option[value="+tomorrow+"]").html("Tomorrow");
}

//This function is run when the DOM is loaded
//	mainly, everything that is JQuery dependent is being set up here
$(document).ready(function() {
	located = false;
	refreshHistory();
	$("button").button();
	$("a.linkButton").button();
	setToday();
	$("#navTabs").tabs();
	$("#locTabs").tabs();
	$("#locAcc").accordion({
		autoHeight: false,
		collapsible: true
	});
	$("#setAdmin").click(function(event){
		event.preventDefault();
		toggleAdmin();
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
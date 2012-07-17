// Joe Kimpel
// CS 601
// HW 3

function hideAll(){
	$("img").hide();
}

function showEven(){
	$("img:even").show('slow');
}

function showOdd(){
	$("img:odd").show('slow');
}

function shiftLeft(){
	$("img:visible").last().after($("img:visible").first());
}

function shiftRight(){
	$("img:visible").first().before($("img:visible").last());
}

$(document).ready(function() {
	$("img").addClass("wrappedElement");
});
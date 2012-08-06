	/********************
	*	Joe Kimpel		*
	*	CS 601			*	
	*	Final Project	*
	*	8.5.2012		*
	*					*
	*********************/

function toggleAdmin(){
	var admin = $("#admin").val();
	if (admin != 0){
		$("#admin").val(0);
		$("#setAdmin span").html("Enable Admin");
		$("#setAdmin").button();
		$.get("auth.php");	//this will clear the server-side admin setting
		ajaxTable();
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
						$.get("auth.php", "uname="+u+"&password="+p, function(data){
								if (data == "Success"){
								$("#admin").val(1);
								$("#setAdmin span").html("Disable Admin");
								$("#setAdmin").button();
								$("#uname").val("");
								$("#pass").val("");
								$("#authDialog").dialog("close");
								ajaxTable();
							}else{
								$("#authFeedback").show();
								$("#authFeedback").html("<span class='highlight'>Auth Failed!</span>");
								$("#authDialog").parent().effect('shake',{times:4}, 120, function(){
									$("#authFeedback").fadeOut(3000);
								});
								$("#uname").val("");
								$("#pass").val("");
							}				
						});
					}
				}
		
		});
	}
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
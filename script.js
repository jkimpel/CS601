/* Script.js
 * Joe Kimpel
 * Homework 2
 * CS 601
 * 6.24.12
 */

function validate(feedbackForm){
	//namePattern matches five or more of any characters
	var namePattern= /^.{5,}$/g;
	if  (!namePattern.test(feedbackForm.name.value)) {
		alert("Please enter at least a five character name.");
		feedbackForm.name.focus();
  		return  false;
 	}
 	//zipPattern matches exactly five digit characters
 	var zipPattern=/^\d{5}$/g;
 	if (!zipPattern.test(feedbackForm.zip.value)){
 		alert("Please enter a five-digit, numeric Zip Code.");
 		feedbackForm.zip.focus();
 		return false;
 	}
 	//emailPattern matches:
 	//	one or more of any character except (/:,;) followed by
 	//	'@' followed by
 	//	one or more of any character except (/:,;) followed by
 	//	'.' followed by
 	//	two or more of any character except (/:,;)
 	var emailPattern=/^[^\/:,;]{1,}@[^\/:,;]{1,}.[^\/:,;]{2,}$/g;
 	if (!emailPattern.test(feedbackForm.emailAddress.value)){
 		alert("Please enter a valid Email Address.");
 		feedbackForm.emailAddress.focus();
 		return false;
 	}
    return  true;
}
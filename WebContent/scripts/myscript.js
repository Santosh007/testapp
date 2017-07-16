$(document).ready(function(){
	const testWrapper = $(".test-wrapper");
	const testArea = $("#test-area");
	const originText = $("#origin-text");
	const sendButton = $("#send");
	const theTimer = $(".timer");
	
	
	function send(){
		alert("Its working....")
	}
	
	
	sendButton.click(send);
});
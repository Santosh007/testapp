$(document).ready(function(){
	const testWrapper = $(".test-wrapper");
	const testArea = $("#test-area");
	const originText = $("#origin-text");
	const userName = $("#user-name");
	const sendButton = $("#send");
	const theTimer = $(".timer");
	const joinButton = $("#join");
	const leaveButton = $("#leave");
	const subhead = $(".intro");
	const audio = $("#msgtone");
	
	var socket;
	var isConnected = false;
	var uname;
	
	var hst=  window.location.host;
	var pth= window.location.pathname;
	
	sendButton.css("display","none");
	joinButton.css("visibility","visible");
	leaveButton.css("visibility","hidden");
	
	function join(){
		uname = userName.val();
		if(uname != ""){
			let url = 'ws://'+hst+pth+uname;
			socket = new WebSocket(url);
			socket.onopen = function(event) {
				subhead.css("background-color","#429890");
				joinButton.css("visibility","hidden");
				leaveButton.css("visibility","visible");
				isConnected=true;
			};
			
			// on message:
			socket.onmessage = function(event) {
				let message = event.data;
				let obj = JSON.parse(message);
				let html = '<li class="received"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
				+ obj.content +'</span></div><div class="receivedtime"><span>'+obj.received+'</span></div></li>';
				originText.append(html);
				let nodes = document.querySelectorAll('.received');
			    nodes[nodes.length-1].scrollIntoView();
			    if(document.hidden){ 
			    	audio[0].play();
			    }
			};
			
			socket.onclose = function(event) {
				subhead.css("background-color","grey");
				joinButton.css("visibility","visible");
				leaveButton.css("visibility","hidden");
				isConnected=false;
			};
			
			// Handle any errors that occur.
			socket.onerror = function(error) {
				alert('WebSocket Error: ' + JSON.stringify(error));
			};
		}else {
			alert("Please enter user name");
		}	
	}
	
	function send(){
		if(isConnected){
			let textEnterd = testArea.val().trim();
			if(textEnterd != ""){
				var msg = '{"content":"' + textEnterd + '", "sender":"' + uname + '", "received":"' + '"}';
				socket.send(msg);
				let html = '<li class="sent"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
				+ '</span></div></li>';
				originText.append(html);
				testArea.val('');
				let nodes = document.querySelectorAll('.sent');
			    nodes[nodes.length-1].scrollIntoView();
			}
		}else{
			alert("Please join to send the messages");
		}
	}
	
	function enter(event){
		if (event.keyCode == 13){
			send();
		}
	}
	
	function leave(){
		socket.close();
	}
	
	sendButton.on("click",send);
	joinButton.on("click",join);
	leaveButton.on("click",leave);
	testArea.on("keydown",enter);
	
});
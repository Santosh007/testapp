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
	var byUser = false;
	var replyhtml;
	
	var hst=  window.location.host;
	var pth= window.location.pathname;
	
	sendButton.css("display","none");
	joinButton.css("visibility","visible");
	leaveButton.css("visibility","hidden");
	
	function join(){
		uname = userName.val();
		byUser = false;
		if(uname != ""){
			let url = 'ws://'+hst+pth+uname;
			socket = new WebSocket(url);
			socket.onopen = function(event) {
				subhead.css("background-color","#429890");
				joinButton.css("visibility","hidden");
				leaveButton.css("visibility","visible");
				isConnected=true;
			};
			
			// on message:<div class="receivedtime"></div>
			socket.onmessage = function(event) {
				let message = event.data;
				let obj = JSON.parse(message);
				let html = '<li><div class="received"><div><span>'+obj.sender+'</span></div><div><span class="msgcontent">'
				+ obj.content +'</span><span class="receivedtime">'+obj.received+'</span></div></div></li>';
				originText.append(html);
				let nodes = document.querySelectorAll('.received');
			    nodes[nodes.length-1].scrollIntoView();
			    if(document.hidden){ 
			    	audio[0].play();
			    }
			};
			
			socket.onclose = function(event) {
				console.log(JSON.stringify(event));
				subhead.css("background-color","grey");
				joinButton.css("visibility","visible");
				leaveButton.css("visibility","hidden");
				isConnected=false;
				if(!byUser){
					console.log("logged in again..!");
					join();
				}
			};
			
			// Handle any errors that occur.
			socket.onerror = function(error) {
				alert('WebSocket Error Server stopped contact santosh: ' + JSON.stringify(error));
				byUser= true;
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
				let liItem = $('<li class="sent"></li>');
				if(replyhtml !== undefined && replyhtml != ""){
					//replyhtml.removeClass('received').addClass('sentr');
					liItem.append(replyhtml.removeClass('received').addClass('sentr'));
					let sent = $('<div class="holder"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
							+ '</span></div></div>').css('border-radius','0px 0px 10px 10px');
					liItem.append(sent);
					replyhtml = '';
				}else{
					liItem.append('<div class="holder"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
							+ '</span></div></div>');
				}
				/*let html = '<li><div class="sent"><div><span>you:</span></div><div><span class="msgcontent">'+textEnterd
				+ '</span></div></div></li>';*/
				originText.append(liItem);
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
		byUser = true;
		socket.close();
	}
	
	originText.on('click','li',function() {
		replyhtml = "";
		$(this).css('background-color','lightblue');
		//replytxt = $(this).text();
		replyhtml = $(this).children().clone();
        //alert('Clicked list. ' + $(this).text());
	});
	
	sendButton.on("click",send);
	joinButton.on("click",join);
	leaveButton.on("click",leave);
	testArea.on("keydown",enter);
	
});
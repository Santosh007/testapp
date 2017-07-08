package com.catchup.app;

import java.io.IOException;

import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/{user}")
public class CatchupEndpoint{
	
	@OnOpen
	public void joinConversation(Session session,@PathParam("user") String user){
		session.getUserProperties().put("user", user);
		System.out.println("Session opened........");
		
	}
	
	@OnMessage
	public void messageRecieved(Session session,String message){
		try {
			session.getBasicRemote().sendText(message);
			System.out.println(message);
			System.out.println(session.getUserProperties().get("user").toString());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}

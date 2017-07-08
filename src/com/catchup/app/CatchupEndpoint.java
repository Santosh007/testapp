package com.catchup.app;

import java.io.IOException;
import java.util.HashMap;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value="/{user}")
public class CatchupEndpoint{
	private static HashMap<String, Session> sessions = new HashMap<>();
	
	@OnOpen
	public void joinConversation(Session session,@PathParam("user") String user){
		session.getUserProperties().put("user", user);
		sessions.put(user, session);
		System.out.println("Session opened........");
	}
	
	@OnMessage
	public void messageRecieved(Session session,String message){
		try {
			for(String user: sessions.keySet()){
				if(!user.equals(session.getUserProperties().get("user").toString())){
					if(sessions.get(user).isOpen()){
					 sessions.get(user).getBasicRemote().sendText(message);
					}else{
						sessions.remove(user);
					}
				}
			}
			//session.getBasicRemote().sendText(message);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@OnClose
	public void  leaveConversation(Session session, 
            CloseReason reason){
	System.out.println(reason.getReasonPhrase());
	sessions.remove(session.getUserProperties().get("user").toString());	
	}
	
	public void conversationInterrupted(Session session, 
            Throwable error){
		sessions.remove(session.getUserProperties().get("user").toString());
		System.out.println(error.getMessage());
	}

}

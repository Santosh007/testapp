/**
 * 
 */
package com.catchup.carrier;

import java.time.LocalTime;
import java.util.Objects;

/**
 * @author Santosh
 *
 */
public class Message {
	private String messageSender;
	private String messageContent;
	private String messageReceivedAt;
	
	public Message() {
	}
	public Message(String messageSender, String messageContent) {
		this(messageSender, messageContent, LocalTime.now().toString());
	}
	public Message(String messageSender, String messageContent, String messageReceivedAt) {
		this.messageSender = messageSender;
		this.messageContent = messageContent;
		this.messageReceivedAt = messageReceivedAt;
	}
	public String getMessageSender() {
		return messageSender;
	}
	public void setMessageSender(String messageSender) {
		this.messageSender = messageSender;
	}
	public String getMessageContent() {
		return messageContent;
	}
	public void setMessageContent(String messageContent) {
		this.messageContent = messageContent;
	}
		
	public String getMessageReceivedAt() {
		return messageReceivedAt;
	}
	public void setMessageReceivedAt(String messageReceivedAt) {
		this.messageReceivedAt = messageReceivedAt;
	}
	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return super.toString();
	}
	@Override
	public boolean equals(Object obj) {
		if(this==obj) return true;
		if(obj==null||getClass()!=obj.getClass()) return false;
		Message message = (Message) obj;
		return Objects.equals(messageContent, message.messageContent)&&
				Objects.equals(messageSender, message.messageSender)&&
				Objects.equals(messageReceivedAt, message.messageReceivedAt);
	}
	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return Objects.hash(messageSender,messageContent,messageReceivedAt);
	}
	
	
	
	
	
	
	
	
	

}

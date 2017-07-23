/**
 * 
 */
package com.catchup.handler;

import java.io.StringReader;
import java.time.LocalTime;

import javax.json.Json;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;

import com.catchup.carrier.Message;

/**
 * @author Santosh
 *
 */
public class ParseMessage implements Decoder.Text<Message> {

	@Override
	public void destroy() {
		// TODO Auto-generated method stub

	}

	@Override
	public void init(EndpointConfig arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public Message decode(String messageString) throws DecodeException {
		LocalTime lt = LocalTime.now();
		JsonObject jsonObject = Json.createReader(new StringReader(messageString)).readObject();
		Message message = new Message(jsonObject.getString("sender"), jsonObject.getString("content"),
				lt.getHour() + ":" + lt.getMinute(), jsonObject.getString("rsender"), jsonObject.getString("rcontent"),
				jsonObject.getString("rreceived"));
		return message;
	}

	@Override
	public boolean willDecode(String arg0) {
		// TODO Auto-generated method stub
		return true;
	}

}

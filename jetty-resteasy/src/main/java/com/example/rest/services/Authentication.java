package com.example.rest.services;

import java.io.File;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.example.beans.UserAuth;
import com.example.beans.UserCredentials;
import com.example.utils.Utils;


@Path("/login")
public class Authentication {
	
	private final List<UserAuth> userAuths= new LinkedList<UserAuth>();
	private UserCredentials[] credentials;
	
	public Authentication(){}
	
	private UserCredentials[] getCredentials() throws JsonParseException, JsonMappingException, IOException{
		//Credentials
		if (this.credentials == null){
			File jsonUsers= new File("../app/data/users.json");
			if (!jsonUsers.exists()){
				String message= "\"" + "json file not found" + jsonUsers.getAbsolutePath().replaceAll("\\\\", "/") +  "\"";
				throw new WebApplicationException(Response.status(400).entity(message).build());
			}
			
			this.credentials= new ObjectMapper().readValue(jsonUsers, UserCredentials[].class);
		}
		
		return this.credentials;		
	}
	
	/** The authentication is not really done here, but in the shiro
	 * filter. This method just send user data
	 * 
	 * @param the user (login and password) to check for
	 * @return user data
	 * @throws JsonParseException if any
	 * @throws JsonMappingException if any
	 * @throws IOException if any
	 */
	@POST
	@Consumes("application/json")
	@Produces("application/json")
	public UserCredentials authenticate(UserAuth ua) throws JsonParseException, JsonMappingException, IOException{

		for(UserCredentials cred: this.getCredentials()){
			//Check login / password
			if (
					(cred.getLogin()!=null &&  cred.getLogin().equals(ua.getLogin())) && 
					(cred.getPassword()!=null && cred.getPassword().equals(ua.getPassword()))
				){
				//Shiro authentication
//				Utils.authenticate(cred.getLogin(), cred.getPassword());

				//return authenticated user data
				return cred;
			}
		}

		throw new WebApplicationException(HttpURLConnection.HTTP_UNAUTHORIZED);
	}
	
	

}

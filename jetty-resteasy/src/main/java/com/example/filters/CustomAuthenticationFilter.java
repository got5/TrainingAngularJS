package com.example.filters;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.codehaus.jackson.map.ObjectMapper;

import com.example.beans.UserAuth;
import com.example.beans.UserCredentials;
import com.example.rest.services.Authentication;



/**
 * 
 * @author a571301
 * <p> In this sample, the login work is done on this filter which means: </p>
 * <ul>
 *  <li>
 *   When the user is authenticated the first time, 
 *   we have to retrieve it's data from the request stream whereas the default
 *   FormAuthenticationFilter uses request parameters, that's why we have a
 *   custom <b>createToken</b> implementation
 *  </li>
 *  <li>
 *   Once the stream is read (in createToken), it cannot be reprocessed later (mark is not supported, (jetty?) ),
 *   then our authentication REST api will not be able to consume this json data again...
 *   This means that for the authentication, we don't let other filters such as jetty to be processed
 *   and we return the answer directly from our filter (onLoginSuccess implementation)
 *   </li>
 *  <li>
 *   We are working in AJAX which was not planned by FormAuthenticationFilter, and so we don't
 *   want redirections on AJAX requests (redirections have to be done programmatically on the
 *   client side )
 *  </li>
 * </ul>
 * 
 */

public class CustomAuthenticationFilter extends FormAuthenticationFilter {
	
	
	private UserAuth currentUser;
	private Boolean isFilterActive;
	
	//By default, form authentication filter doesn't let other fields
	// to be applied during the login process, which we are not agree with...
	@Override
	protected boolean onLoginSuccess(AuthenticationToken token,
			Subject subject, ServletRequest request, ServletResponse response){
		
		Authentication authentication= new Authentication();
		
		try {
			UserCredentials authenticated = authentication.authenticate(this.currentUser);
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json");
			new ObjectMapper().writeValue(response.getOutputStream(), authenticated);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}


	// We are using application/json content, whereas standard FormAuthenticationFilter
	// is waiting for form encoded content. This update let us read parameters
	// in the json content
	@Override
	protected AuthenticationToken createToken(ServletRequest request,ServletResponse response) {
		
		if (request.getContentType().startsWith("application/json")){
			try {
				InputStream postIs= request.getInputStream();
				UserAuth user= new ObjectMapper().readValue(postIs, UserAuth.class);
				this.currentUser= user;
		        String username = user.getLogin();
		        String password = user.getPassword();
		        return createToken(username, password, request, response);				
			} catch (IOException e) {
				e.printStackTrace();
				return super.createToken(request, response);
			}
		}else{
			return super.createToken(request, response);
		}
	}	
	
	
	boolean isAjax(HttpServletRequest request){
		return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
	}


	@Override
	protected void redirectToLogin(ServletRequest req, ServletResponse res) throws IOException {
		
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response= (HttpServletResponse) res;
		
		//Don't redirect in case of ajax request
		boolean isAjax = this.isAjax(request);
		if (isAjax) {
			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
			response.getWriter().println("<p>Unauthorized request</p>");
		}
		// Redirect for standard requests only
		else {
			super.redirectToLogin(req, res);
		}
	}


	@Override
	protected boolean isEnabled(ServletRequest request, ServletResponse response)
			throws ServletException, IOException {
		if (this.isFilterActive == null){
			this.isFilterActive= Boolean.parseBoolean(System.getProperty("DISABLE_FILTER")); 
		}
		
		return this.isFilterActive;
	}
	
	

}
package com.example.filters;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.web.filter.authc.LogoutFilter;

public class AjaxLogoutFilter extends LogoutFilter {
	
	
	boolean isAjax(HttpServletRequest request){
		//System.out.format("url context path: %s\n", request.getContextPath());
		return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
	}	

	@Override
	protected void issueRedirect(ServletRequest req,ServletResponse res, String redirectUrl) throws Exception {
		
		HttpServletRequest request= (HttpServletRequest) req;
		HttpServletResponse response= (HttpServletResponse) res;

		//Don't redirect in case of ajax request
		boolean isAjax = this.isAjax(request);
		System.out.println(isAjax);
		if (isAjax) {
			response.setStatus(HttpServletResponse.SC_OK);
		}
		else{
			super.issueRedirect(request, response, redirectUrl);
		}
	}
	
}

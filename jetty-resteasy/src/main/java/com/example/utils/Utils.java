package com.example.utils;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;

public class Utils {
	
	public static void authenticate(String name, String passwd){
		
		UsernamePasswordToken token= new UsernamePasswordToken(name, passwd);
		token.setRememberMe(false);
		Subject currentUser= SecurityUtils.getSubject();
		currentUser.login(token);
		
	}

}

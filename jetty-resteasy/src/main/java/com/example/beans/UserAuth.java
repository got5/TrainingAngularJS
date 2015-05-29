package com.example.beans;

public class UserAuth {
	
	private String login;
	private String password;
	
	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Override
	public boolean equals(Object obj) {
		// TODO Auto-generated method stub
		if (obj instanceof UserAuth){
			UserAuth other= (UserAuth) obj;
			return ( (this.getLogin()==null && other.getLogin()==null) || 
					 ( (other.getLogin().equals(this.getLogin()) ) && 
					   (other.getPassword().equals(this.getPassword()) )
					 )
			);
		}
		
		return false;
	}
	
	


}

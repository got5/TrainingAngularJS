package com.example.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import com.example.rest.services.Authentication;
import com.example.rest.services.CatalogApi;
import com.example.rest.services.NewsApi;

public class Ecommerce extends Application{

	private HashSet<Object> singletons = new HashSet<Object>();

	public Ecommerce() {
		singletons.add(new Authentication());
		singletons.add(new NewsApi());
		singletons.add(new CatalogApi());
	}

	@Override
	public Set<Class<?>> getClasses() {
		HashSet<Class<?>> set = new HashSet<Class<?>>();
		return set;
	}

	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
	
}
package com.example.rest.services;

import java.io.File;
import java.io.IOException;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.example.beans.Product;

@Path("/")
public class CatalogApi {
	
	
	private Product[] products;
	
	public CatalogApi(){}
	
	private Product[] getProducts() throws JsonParseException, JsonMappingException, IOException{
		//Credentials
		if (this.products == null){
			File jsonCatalog= new File("../app/data/catalog.json");
			if (!jsonCatalog.exists()){
				String message= "\"" + "json file not found" + jsonCatalog.getAbsolutePath().replaceAll("\\\\", "/") +  "\"";
				throw new WebApplicationException(Response.status(400).entity(message).build());
			}
			
			this.products= new ObjectMapper().readValue(jsonCatalog, Product[].class);
		}
		
		return this.products;
	}
	
	@GET
	@Path("catalog")
	@Produces("application/json")
	public Product[] getAllnewsApi() throws JsonParseException, JsonMappingException, IOException{
		return this.getProducts();
	}
	
	
	@GET
	@Path("catalog/{id}")
	@Produces("application/json")
	public Product getnewsApi(@PathParam("id") int id) throws JsonParseException, JsonMappingException, IOException{
		
		for (Product p: this.getProducts()){
			if (p.getId() == id){
				return p;
			}
		}
		
		throw new WebApplicationException();
	}
	
}

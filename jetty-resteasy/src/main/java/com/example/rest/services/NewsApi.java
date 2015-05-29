package com.example.rest.services;

import java.io.File;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import com.example.beans.News;

@Path("/")
public class NewsApi {
	
	private News[] news;
	
	public NewsApi(){}
	
	private News[] getNews() throws JsonParseException, JsonMappingException, IOException{
		//Credentials
		if (this.news == null){
			File jsonNews= new File("../app/data/news.json");
			if (!jsonNews.exists()){
				String message= "\"" + "json file not found" + jsonNews.getAbsolutePath().replaceAll("\\\\", "/") +  "\"";
				throw new WebApplicationException(Response.status(400).entity(message).build());
			}
			
			this.news= new ObjectMapper().readValue(jsonNews, News[].class);
		}
		
		return news;
	}
	
	private void addNews(News newNews) throws JsonParseException, JsonMappingException, IOException{
		News[] theNews= this.getNews();
		
		//Update news array
		News[] updatedNews= new News[theNews.length + 1];
		int higherId= 0;
		for (int i= 0; i< theNews.length; i++){
			updatedNews[i]= theNews[i];
			higherId= theNews[i].getId();
		}
		updatedNews[theNews.length]= newNews;
		
		//Update news content
		newNews.setId(higherId+1);
		newNews.setLikes(0);		
		
		this.news= updatedNews;
				
	}
	
	private void deleteNews(int id) throws JsonParseException, JsonMappingException, IOException{
		
		List<News> newNews= new LinkedList<News>();
		
		for (News currNews: this.getNews()){
			if (currNews.getId() != id){
				newNews.add(currNews);
			}
		}
		
		if (newNews.size() == this.getNews().length){
			//RAS -> nothing deleted
		}else{
			this.news= newNews.toArray(new News[newNews.size()]);
		}

	}	
	
	@GET
	@Path("news")
	@Produces("application/json")
	public News[] getAllnewsApi() throws JsonParseException, JsonMappingException, IOException{
		
		return this.getNews();
	}
	
	
	@GET
	@Path("news/{op}")
	@Produces("application/json")
	public Response getnewsApi(@PathParam("op") String op) throws JsonParseException, JsonMappingException, IOException{
		
		News[] theNews= this.getNews();

		if ("random".equals(op)){
			int randId= (int) (Math.random() * (double)theNews.length);
			return Response.ok().entity(theNews[randId]).build();
		}else{
			int id= Integer.parseInt(op);
			return Response.ok().entity(theNews[id]).build();
		}
	}
	
	
	@POST
	@Path("news")
	@Consumes("application/json")
	@Produces("application/json")
	public News addNewsApi(News newNews) throws JsonParseException, JsonMappingException, IOException{
		this.addNews(newNews);
		return newNews;
	}
	
	@GET
	@Path("news/like/{id}")
	@Produces("application/json")
	public News likeNewsApi(@PathParam("id") int id) throws JsonParseException, JsonMappingException, IOException{
		
		for(News currnews: this.getNews()){
			if (currnews.getId() == id){
				currnews.setLikes(currnews.getLikes()+1);
				return currnews;
			}
		}
		
		return null;		
	}
	
	
	@DELETE
	@Path("news/{id}")
	public Response deleteNewsApi(@PathParam("id") int id) throws JsonParseException, JsonMappingException, IOException{
		deleteNews(id);
		return Response.ok().build();
	}
	

}

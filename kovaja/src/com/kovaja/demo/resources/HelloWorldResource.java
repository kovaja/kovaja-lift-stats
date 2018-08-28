package com.kovaja.demo.resources;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import com.kovaja.demo.services.HelloWorldService;

@Path("/demo/sayhello")
public class HelloWorldResource {

    @GET
    @Path("/{name}")
    public Response sayHello(@PathParam("name") String userMessage) {
    	HelloWorldService service = new HelloWorldService();

    	String message = service.getMessage(userMessage);
        return Response.status(200).entity(message).build();
    }
}

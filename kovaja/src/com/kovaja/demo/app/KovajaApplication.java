package com.kovaja.demo.app;

import org.glassfish.jersey.server.ResourceConfig;

public class KovajaApplication extends ResourceConfig {
    public KovajaApplication() {
        // Define the package which contains the service classes.
        packages("com.kovaja.demo.services");
    }

}

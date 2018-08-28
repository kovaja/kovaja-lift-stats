package com.kovaja.demo.services;

public class HelloWorldService {
	private static final String SERVICE_MESSAGE = "Service response";

    public String getMessage(String userMessage) {
        return SERVICE_MESSAGE + ": Hello 1 " + userMessage;
    }
}

package com.examly.springapp.exceptions;

public class DuplicateOrderException extends Exception{
	public DuplicateOrderException(String msg) {
		super(msg);
	}
}

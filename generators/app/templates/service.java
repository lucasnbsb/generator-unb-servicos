package <%- servicePath%>;

import java.util.List;
import javax.ejb.Stateless;

import <%-infraPath%>.<%-infraClass%>;
import <%-modelPath%>.<%-nomeTitleCase%>;

@Stateless
public class <%-nomeTitleCase%>Service {
	
	public List<<%-nomeTitleCase%>> find(String filter, String fields, int limit, int offset, String sort) {
		return <%-infraClass%>.getInstance().get<%-nomeTitleCase%>Repository().find(filter, fields, limit, offset, sort);
	}
	
	public <%-nomeTitleCase%> update(<%-nomeTitleCase%> obj) {
		return <%-infraClass%>.getInstance().get<%-nomeTitleCase%>Repository()
				.update(obj);
	}
	
	public <%-nomeTitleCase%> insert(<%-nomeTitleCase%> obj) {
		return <%-infraClass%>.getInstance().get<%-nomeTitleCase%>Repository().insert(obj);
	}
	
	public boolean delete(Integer id) {
		return <%-infraClass%>.getInstance().get<%-nomeTitleCase%>Repository().delete(id);
	}
	
}
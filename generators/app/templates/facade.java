package <%- facadePath%>;

import java.util.List;

import javax.ejb.Singleton;
import javax.ejb.Startup;

import <%-modelPath%>.<%-nomeTitleCase%>;
import <%-servicePath%>.<%-applicationClass%>;
import br.erlangms.EmsServiceFacade;
import br.erlangms.IEmsRequest;

@Singleton
@Startup
public class <%-nomeTitleCase%>Facade extends EmsServiceFacade {
	public List<<%-nomeTitleCase%>> find(IEmsRequest request){
		String filter = request.getQuery("filter");
		String fields = request.getQuery("fields");
		int limit = request.getQueryAsInt("limit");
		int offset = request.getQueryAsInt("offset");
		String sort = request.getQuery("sort");
		
		return <%-applicationClass%>.getInstance()
			.get<%-nomeTitleCase%>Service().find(filter, fields, limit, offset, sort);
	}
	
	public <%-nomeTitleCase%> update(IEmsRequest request) {
		int id = request.getParamAsInt("id");
		<%-nomeTitleCase%> <%-nome%> = <%-applicationClass%>.getInstance().get<%-nomeTitleCase%>Service().findById(id);
		request.mergeObjectFromPayload(<%-nome%>);
		return <%-applicationClass%>.getInstance().get<%-nomeTitleCase%>Service().update(<%-nome%>);
	}
	
	public <%-nomeTitleCase%> insert(IEmsRequest request) {
		<%-nomeTitleCase%> <%-nome%> = (<%-nomeTitleCase%>) request.getObject(<%-nomeTitleCase%>.class);
		return <%-applicationClass%>.getInstance().get<%-nomeTitleCase%>Service().insert(<%-nome%>);
	}
	
	public Boolean delete(IEmsRequest request){
		int id = request.getParamAsInt("id");
		return <%-applicationClass%>.getInstance()
			.get<%-nomeTitleCase%>Service()
			.delete(id);
	}
}

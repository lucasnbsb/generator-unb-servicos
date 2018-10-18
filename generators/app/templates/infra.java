package <%-infraPath%>;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import br.erlangms.EmsRepository;
import <%-modelPath%>.<%-nomeTitleCase%>;

@Stateless
public class <%-nomeTitleCase%>Repository extends EmsRepository<<%-nomeTitleCase%>> {

	@PersistenceContext(unitName = "service_context")
	public EntityManager serviceContext;
	
	@Override
	public Class<<%-nomeTitleCase%>> getClassOfModel() {
		return <%-nomeTitleCase%>.class;
	}

	@Override
	public EntityManager getEntityManager() {
		return serviceContext;
	}

}
 
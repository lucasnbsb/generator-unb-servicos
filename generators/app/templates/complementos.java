@EJB
private <%-nomeTitleCase%>Repository <%-nomeVariableCase%>Repository;

public <%-nomeTitleCase%>Repository get<%-nomeTitleCase%>Repository() {
    return situacaoPlanoRepository;
}


@EJB private <%-nomeTitleCase%>Service <%-nomeVariableCase%>Service;

public <%-nomeTitleCase%>Service get<%-nomeTitleCase%>Service() {
    return <%-nomeTitleCase%>Service;
}
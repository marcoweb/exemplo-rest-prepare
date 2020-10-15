var tarefas =  [];

function addTarefa() {
    let tarefa = {
        id : (tarefas.length > 0) ? tarefas[tarefas.length -1].id + 1 : 1,
        descrição : document.querySelector("#txtDescricao").value,
        concluída : false
    }
    axios.post(window.location.href + "tarefas", tarefa).then(function(response) {
        getTarefas();
    });
    document.querySelector("#txtDescricao").value = "";
}

function removeTarefa(id) {
    tarefa = tarefas.find(t => t.id == id);
    axios.delete(window.location.href + "tarefas", tarefa).then(function(response) {
        getTarefas();
    });
}

function setConcluida(id) {
    tarefa = tarefas.find(t => t.id == id);
    tarefa.concluída = !tarefa.concluída;
    axios.put(window.location.href + "tarefas", tarefa).then(function(response) {
        getTarefas();
    });
}

function getTarefas() {
    axios.get(window.location.href + "tarefas").then(function(response) {
        tarefas = [];
        tarefas = response.data;
        carregaTarefas();
    });
}

function carregaTarefas() {
    let tabela = document.querySelector("#tbl_tarefas");
    tabela.innerHTML = '';
    tarefas.forEach(function(t) {
        let linha = document.createElement('tr');
        let coluna_desc = document.createElement('td');
        coluna_desc.innerHTML = t.descrição;
        linha.appendChild(coluna_desc);
        let coluna_conc = document.createElement('td');
        let btn_concluido = document.createElement('button');
        btn_concluido.setAttribute('type', 'button');
        btn_concluido.setAttribute('onclick', 'setConcluida(' + t.id + ')');
        btn_concluido.innerHTML = (t.concluída) ? "SIM" : "NÃO";
        coluna_conc.appendChild(btn_concluido);
        let btn_remove = document.createElement('button');
        btn_remove.setAttribute('type', 'button');
        btn_remove.setAttribute('onclick', 'removeTarefa(' + t.id + ')');
        btn_remove.innerHTML = 'Remover Ítem';
        coluna_conc.appendChild(btn_remove);

        linha.appendChild(coluna_conc);

        tabela.appendChild(linha);
    });
}


getTarefas();
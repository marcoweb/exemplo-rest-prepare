const express = require('express')
const app = express()
const port = 3000

app.use(express.json())



const tarefas = [
    {id: 1, descrição : "Ler livro", concluída: false},
    {id: 2, descrição : "Escrever Resumo", concluída: false}
];

app.use(express.static('public'));

app.get("/tarefas", function(req, res) {
    res.json(tarefas);
});

app.get("/tarefas/:id", function(req, res) {
    const { id } = req.params;
    const tarefa = tarefas.find(t => t.id == id);
    res.json(tarefa);
});

app.put("/tarefas", function(req, res) {
    const {id, descrição, concluída} = req.body;
    tarefa = tarefas.find(t => t.id == id);
    tarefa.descrição = descrição;
    tarefa.concluída = concluída;
    res.json(tarefa);
});

app.post("/tarefas", function(req, res) {
    const tarefa = req.body;
    tarefas.push(tarefa);
    res.json(tarefa);
});

app.delete("/tarefas", function(req, res) {
    const {id, descrição, concluída} = req.body;
    tarefa = tarefas.find(t => t.id == id);
    tarefas.splice(tarefas.indexOf(t => t.id == tarefa.id), 1);
    res.json(tarefa);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
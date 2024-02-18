import express  from "express";
import { createTable, createTarefa, deleteTarefa, getAllTarefas, getTarefa, updateTarefa } from "./Controller/Tarefa.js";



const app = express()
const PORT = 3000

app.use(express.json())
createTable()

app.get('/tarefa', async(req,res)=>{
  console.log(req.body.id)
  const tarefa = await getTarefa(req.body.id)
  res.json({tarefa})
})

app.get('/tarefas', async (req, res) => {
  try {
    // Chama a função getAllTarefas para obter todas as tarefas do banco de dados
    const tarefas = await getAllTarefas();

    // Envia as tarefas como resposta
    res.json(tarefas);
  } catch (error) {
    // Se ocorrer um erro durante o processamento da requisição, envia uma resposta de erro com o detalhe do erro
    res.status(500).json({ error: "Erro ao obter as tarefas" });
  }
})

app.post('/tarefa',(req,res)=>{
  if(req.body.nome == "undefiened" || req.body.estado == "undefiened"){
    res.send("Erro, insira informacoes validas")
  } else{

  
  console.log(req.body)
  createTarefa(req.body)
  res.json({
    "statuscode":200
  })
  }
})

app.patch('/tarefa', async(req,res) =>{
  console.log(req.body)
  updateTarefa(req.body)
  res.json({"statusCode":200})
})

app.delete('/tarefa', async (req,res)=>{
  console.log(req.body)
  deleteTarefa(req.body.id)
  res.json({"stausCode":200})
})

app.listen(PORT, ()=>console.log("rodando liso"))


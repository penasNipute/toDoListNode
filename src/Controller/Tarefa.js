import { openDb } from '../configDB.js'

export async function createTable(){
  
  try {
    const db = await openDb();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS Tarefa (
        id INTEGER PRIMARY KEY,
        nome TEXT,
        estado TEXT
      )
    `)
    console.log("Tabela Tarefa criada com sucesso!");
  } catch (error) {
    console.error("Erro ao criar tabela Tarefa:", error);
  }
}

export async function createTarefa(tarefa) {
  try {
    const db = await openDb(); // Abre o banco de dados SQLite
    await db.run(`INSERT INTO Tarefa (nome, estado) VALUES (?, ?)`, [tarefa.nome, tarefa.estado]); // Insere uma nova tarefa na tabela
    console.log("Tarefa criada com sucesso:", tarefa);
    return { success: true, message: "Tarefa criada com sucesso" };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    return { success: false, message: "Erro ao criar tarefa" };
  }
}

export async function getAllTarefas() {
  const db = await openDb(); // Abre o banco de dados SQLite
  const tarefas = await db.all(`SELECT * FROM Tarefa`); // Recupera todas as tarefas da tabela
  return tarefas; // Retorna as tarefas recuperadas
}

export async function getTarefa(id){
  const db = await openDb()
  const tarefa = await db.get(`SELECT * FROM Tarefa WHERE id=?`,[id])
  return tarefa
}

export async function updateTarefa(tarefa){
  const db = await openDb()

  db.run(`UPDATE Tarefa SET estado = ? WHERE id = ?`,[tarefa.estado, tarefa.id])
}

export async function deleteTarefa(id){
  const db = await openDb()
  await db.run(`DELETE FROM Tarefa WHERE id=?`,[id])
}
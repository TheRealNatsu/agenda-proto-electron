const Database = require("better-sqlite3");
const database = new Database("./database/database.db");

function getDatabase() {
  return database;
}

const fechaActual = new Date();


function obtenerData() {
const query = database.prepare(`SELECT * FROM tareas ORDER BY fecha`);
const data = query.all()
const dataFiltrada = data.filter((a)=> a.fecha >= fechaActual.toISOString()); 
return dataFiltrada
}

function eliminarRegistro(n) {
  const query = database.prepare(`DELETE FROM tareas WHERE id = ?`);
  query.run(n)
}

module.exports = { getDatabase, obtenerData, eliminarRegistro };

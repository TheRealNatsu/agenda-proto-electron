const Database = require("better-sqlite3");
const database = new Database("./database/database.db");

function getDatabase() {
  return database;
}

function obtenerData() {
const query = database.prepare(`SELECT * FROM tareas`);
const data = query.all()
console.log(data);
}
obtenerData()
module.exports = { getDatabase };

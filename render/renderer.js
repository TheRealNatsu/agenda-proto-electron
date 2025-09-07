const { ipcRenderer } = require("electron");

const { getDatabase, obtenerData } = require('../database/database.js');
const database = getDatabase();

const turnos = document.getElementById('agenda-cont');

ipcRenderer.on("send-task", (e, newTask) => {
  const { cliente, servicio, fecha, descripcion} = newTask;
  const query = database.prepare('INSERT INTO tareas (fecha, cliente, servicio, descripcion) VALUES ( ? , ? , ? , ?)');
  query.run(fecha, cliente, servicio, descripcion);
});

const listaTareas = obtenerData();
for (let i = 0; i < listaTareas.length; i++){
    // console.log(listaTareas[i])
}

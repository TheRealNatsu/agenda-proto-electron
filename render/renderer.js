const { ipcRenderer } = require("electron");
//conexion base de datos
const { getDatabase, obtenerData } = require("../database/database.js");
const database = getDatabase();
//obtencion elemento padre
const turnos = document.getElementById("agenda-cont");
//renderizado de electron hacia pagina principal, insercion nuevos datos
ipcRenderer.on("send-task", (e, newTask) => {
  const { cliente, servicio, fecha, descripcion } = newTask;
  const query = database.prepare(
    "INSERT INTO tareas (fecha, cliente, servicio, descripcion) VALUES ( ? , ? , ? , ?)"
  );
  query.run(fecha, cliente, servicio, descripcion);
});

const listaTareas = obtenerData();

listaTareas.sort((a, b) => {
  return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
});

for (let i = 0; i < listaTareas.length; i++) {
  let cardTemplate = `<div class="card">
          <h3>${listaTareas[i].cliente}</h3>
          <p>${listaTareas[i].fecha}</p>
          <button>X</button>
          <h4>${listaTareas[i].servicio}</h4>
          <p>${listaTareas[i].descripcion}</p>
        </div>`;
  turnos.innerHTML += cardTemplate;
}

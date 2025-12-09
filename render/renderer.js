const { ipcRenderer } = require("electron");

//conexion base de datos
const {
  getDatabase,
  obtenerData,
  eliminarRegistro,
} = require("../database/database.js");
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

//obtencion tabla de tareas
const listaTareas = obtenerData();

//creacion de tarjetas html
for (let i = 0; i < listaTareas.length; i++) {
  let fecha = new Date(listaTareas[i].fecha);
//plantilla tarjetas
  let cardTemplate = `<div class="card">
          <h3>${listaTareas[i].cliente}</h3>
          <p>${fecha.getDate()}-${
    fecha.getMonth() + 1
  } / ${fecha.getHours()}:${fecha.getMinutes()}hs</p>
          <button class="btn">X</button>
          <h4>${listaTareas[i].servicio}</h4>
          <p>${listaTareas[i].descripcion}</p>
        </div>`;
  turnos.innerHTML += cardTemplate;
// funcion de boton para eliminar tarea
  const btns = document.querySelectorAll(".btn");
  //convertir nodelist en array para usar indexOf para la funcion eliminarRegistro
  const arrayBtn = Array.from(btns);
 
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      
      eliminarRegistro(listaTareas[arrayBtn.indexOf(btn)].id);
    });
  });
}

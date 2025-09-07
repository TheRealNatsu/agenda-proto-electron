const { ipcRenderer } = require('electron');

const taskForm = document.getElementById("form-content");

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const cliente = document.getElementById("cliente").value;
  const fecha = document.getElementById("fecha").value;
  const servicio = document.getElementById("servicio").value;
  const descripcion = document.getElementById("descripcion").value;

  const newTask = {
    cliente: cliente,
    fecha: fecha,
    servicio: servicio,
    descripcion: descripcion
  }

  ipcRenderer.send("send-task", newTask)
});

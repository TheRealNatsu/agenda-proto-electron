const {} = require('electron')

const taskForm = document.getElementById('form-content');

const cliente = document.getElementById('cliente');
const fecha = document.getElementById('fecha');
const servicio = document.getElementById('servicio');
const descripcion = document.getElementById('descripcion');

taskForm.addEventListener('submit', (e)=>{
    e.preventDefault()
})
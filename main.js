const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

//Paquetes y procesos que no correria fuera de produccion
if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {});
}

//requerimiento a la base de datos
const { getDatabase } = require("./database/database.js");

//Ventana principal
const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.loadFile(path.join(__dirname, "pages/index.html"));
};

//ventana para agregar turnos
const createTaskWindow = () => {
  const taskWindow = new BrowserWindow({
    width: 350,
    height: 270,
    title: "Nuevo turno",
  });
  taskWindow.setMenu(null);
  taskWindow.loadFile(path.join(__dirname, "pages/newtask.html"));
};

//menu de navegacion principal
const templateMenu = [
  {
    label: "Agenda",
    submenu: [
      {
        label: "Crear turno",
        accelerator: "Ctrl+T",
        click: () => {
          createTaskWindow();
        },
      },
    ],
  },
];

app.whenReady().then(() => {
  createWindow();
  getDatabase();
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
});

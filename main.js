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
  window.on("closed", () => {
    app.quit();
  });
};

//ventana para agregar turnos
const createTaskWindow = () => {
  let taskWindow = new BrowserWindow({
    width: 350,
    height: 270,
    title: "Nuevo turno",
  });
  // taskWindow.setMenu(null);
  taskWindow.loadFile(path.join(__dirname, "pages/newtask.html"));
  taskWindow.on("closed", () => {
    taskWindow = null;
  });
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
      { type: "separator" },
      {
        label: "Exit",
        accelerator: "Ctrl+Q",
        click: () => {
          app.quit();
        },
      },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  templateMenu.push({
    label: "DevTools",
    submenu: [
      {
        label: "Show/ Hide DevTools",
        accelerator: "Ctrl+Shift+R",
        click: (item, focusedWindow) => {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

app.whenReady().then(() => {
  createWindow();
  getDatabase();
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
});

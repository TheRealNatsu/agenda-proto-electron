const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

//Paquetes y procesos que no correria fuera de produccion
if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {});
}

//requerimiento a la base de datos
const { getDatabase } = require("./database/database.js");

//declaracion de ventanas
let window;
let taskWindow;

//Ventana principal
const createWindow = () => {
  window = new BrowserWindow({
    width: 1200,
    height: 900,
    title: "Agenda DIOSA MADRE",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.loadFile(path.join(__dirname, "pages/index.html"));
  window.on("closed", () => {
    app.quit();
  });
};

//ventana para agregar turnos
const createTaskWindow = () => {
  taskWindow = new BrowserWindow({
    width: 350,
    height: 480,
    title: "Nuevo turno",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  taskWindow.setMenu(null);
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
        label: "Agenda diaria",
        accelerator: "Ctrl+A",
        click: () => {
          window.loadFile(path.join(__dirname, "pages", "index.html"));
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
  {
    label: "Contables",
    submenu: [
      {
        label: "Registro diario",
        click: () => {
          window.loadFile(path.join(__dirname, "pages", "contable.html"));
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

//protocolo de comunicacion entre ventanas
ipcMain.on("send-task", (e, newTask) => {
  window.webContents.send("send-task", newTask);
  taskWindow.close();
});

app.whenReady().then(() => {
  createWindow();
  getDatabase();
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu);
});


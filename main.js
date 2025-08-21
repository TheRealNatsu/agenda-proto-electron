const { app, BrowserWindow } = require("electron");

require("electron-reload")(__dirname);

const { getDatabase } = require("./database/database.js");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  window.loadFile("index.html");
};

app.whenReady().then(() => {
  createWindow();
  getDatabase();
});

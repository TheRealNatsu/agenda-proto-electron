const { app, BrowserWindow } = require("electron");
const path = require("path");

require("electron-reload")(__dirname);

const { getDatabase } = require("./database/database.js");

const createWindow = () => {
  const window = new BrowserWindow({
    width: 800,
    height: 600,
  });
  window.loadFile(path.join(__dirname, "pages/index.html"));
};

app.whenReady().then(() => {
  createWindow();
  getDatabase();4
});

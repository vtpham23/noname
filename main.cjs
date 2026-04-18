"use strict";

const { app, BrowserWindow } = require("electron");
const path = require("path");

require("./server.cjs");

let win;

function createWindow() {
  const win = new BrowserWindow({
    width: 2000,
    height: 1250,
    title: "noname_websocket_server",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadURL('http://localhost:8080');
}

app.on("ready", createWindow);
app.on("window-all-closed", () => app.quit());

app.on("activate", () => {
	if (win === null) createWindow();
});
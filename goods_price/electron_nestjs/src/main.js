const { app, BrowserWindow, globalShortcut } = require('electron');
const { bootstrap } = require('../backend/dist/src/main.js');
const { resolve: pathResolve, join: pathJoin } = require('node:path');

const PROJECT_ROOT = pathResolve(__dirname, '../');
function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    autoHideMenuBar: true
  });

  win.loadFile(pathJoin(PROJECT_ROOT, 'frontend/dist/index.html'))

  /* // F5 刷新
  globalShortcut.register('F5', () => {
    win.webContents.reload() // 刷新页面
  })

  // Ctrl+R 刷新
  globalShortcut.register('CommandOrControl+R', () => {
    win.webContents.reload()
  }) */
}

app.whenReady().then(async () => {
  try {
    await bootstrap();
    createWindow();
  } catch (err) {
    console.log('err:', err)
  }
});
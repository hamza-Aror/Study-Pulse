const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const dataFile = path.join(app.getPath('userData'), 'studypulse-data.json');

function readData() {
  try {
    return JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  } catch (e) {
    return {};
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Failed to write StudyPulse data:', e);
  }
}

let mainWindow;

function createWindow() {
  const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
  const winWidth = 360;
  const winHeight = 640;

  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    x: screenWidth - winWidth - 24,
    y: 24,
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    fullscreenable: false,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  // Auto-start at login. Users can turn this off from Settings inside the widget.
  const data = readData();
  const autoLaunch = data['sp-auto-launch'] !== 'false';
  app.setLoginItemSettings({ openAtLogin: autoLaunch });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('storage-get', (event, key) => {
  const data = readData();
  return data[key] !== undefined ? { key, value: data[key] } : null;
});

ipcMain.handle('storage-set', (event, key, value) => {
  const data = readData();
  data[key] = value;
  writeData(data);
  return { key, value };
});

ipcMain.handle('storage-delete', (event, key) => {
  const data = readData();
  delete data[key];
  writeData(data);
  return { key, deleted: true };
});

ipcMain.handle('set-auto-launch', (event, enabled) => {
  const data = readData();
  data['sp-auto-launch'] = enabled ? 'true' : 'false';
  writeData(data);
  app.setLoginItemSettings({ openAtLogin: enabled });
  return { ok: true };
});

ipcMain.handle('close-app', () => app.quit());
ipcMain.handle('minimize-app', () => mainWindow.minimize());

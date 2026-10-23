const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('storage', {
  get: (key) => ipcRenderer.invoke('storage-get', key),
  set: (key, value) => ipcRenderer.invoke('storage-set', key, value),
  delete: (key) => ipcRenderer.invoke('storage-delete', key)
});

contextBridge.exposeInMainWorld('desktopApp', {
  close: () => ipcRenderer.invoke('close-app'),
  minimize: () => ipcRenderer.invoke('minimize-app'),
  setAutoLaunch: (enabled) => ipcRenderer.invoke('set-auto-launch', enabled)
});

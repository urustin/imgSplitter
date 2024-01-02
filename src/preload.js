const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'api', {
    selectImage: async () => {
      return ipcRenderer.invoke('select-image');
    },
    readImage: async (path) => {
      return ipcRenderer.invoke('read-image', path);
    },
    splitImage: async (path, left, top, width, height, imageWidth, row) => {
      return ipcRenderer.invoke('split-image', path, left, top, width, height, imageWidth, row);
    },
    on: (channel, func) => ipcRenderer.on(channel, func),
    send: (channel, args) => ipcRenderer.send(channel, args),
  }
);
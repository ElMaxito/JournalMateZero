import path from 'path';
import { app, BrowserWindow, protocol } from 'electron';
import { WindowManager } from './windowManager';
import { AppUpdater } from './appUpdater';
import { isDebug, installExtensions } from './devUtils';
import MenuBuilder from './menu';
import { FileManager } from './fileManager';
import { setupIpcHandlers } from './ipcHandlers';

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (isDebug) {
  require('electron-debug')();
}

const windowManager = new WindowManager();
const fileManager = new FileManager();

// Add this line to set the RECORDINGS_PATH
process.env.RECORDINGS_PATH = path.join(__dirname, '..', 'recordings');

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  const mainWindow = windowManager.createWindow(app, getAssetPath);

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Setup IPC handlers
  setupIpcHandlers(fileManager);

  // Remove this if your app does not use auto updates
  new AppUpdater();
};

// Set up a custom protocol to serve local files
app.whenReady().then(() => {
  protocol.registerFileProtocol('safe-local-file', (request, callback) => {
    const url = request.url.replace('safe-local-file://', '');
    try {
      return callback(decodeURIComponent(url));
    } catch (error) {
      console.error(error);
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      if (windowManager.mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
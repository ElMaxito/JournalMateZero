import path from 'path';
import { app, ipcMain } from 'electron';
import { WindowManager } from './windowManager';
import { AppUpdater } from './appUpdater';
import { isDebug, installExtensions } from './devUtils';
import MenuBuilder from './menu';
import { AudioRecorder } from './audioRecorder';
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

  // Setup audio recorder
  const audioRecorder = new AudioRecorder(mainWindow);
  audioRecorder.setupListeners();

  // Setup file manager and IPC handlers
  const fileManager = new FileManager();
  setupIpcHandlers(fileManager);

  // Remove this if your app does not use auto updates
  new AppUpdater();
};

// Example IPC handler (you can move this to ipcHandlers.ts if preferred)
ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (windowManager.mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

// Optional: You can add any additional app-wide event listeners here
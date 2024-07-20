import { BrowserWindow, shell } from 'electron';
import path from 'path';
import { resolveHtmlPath } from './util';

export class WindowManager {
  mainWindow: BrowserWindow | null = null;

  createWindow(app: Electron.App, getAssetPath: (...paths: string[]) => string) {
    this.mainWindow = new BrowserWindow({
      show: false,
      width: 1024,
      height: 728,
      icon: getAssetPath('icon.png'),
      webPreferences: {
        preload: app.isPackaged
          ? path.join(__dirname, 'preload.js')
          : path.join(__dirname, '../../.erb/dll/preload.js'),
      },
    });

    this.mainWindow.loadURL(resolveHtmlPath('index.html'));

    this.mainWindow.on('ready-to-show', () => {
      if (!this.mainWindow) {
        throw new Error('"mainWindow" is not defined');
      }
      if (process.env.START_MINIMIZED) {
        this.mainWindow.minimize();
      } else {
        this.mainWindow.show();
      }
    });

    this.mainWindow.on('closed', () => {
      this.mainWindow = null;
    });

    this.mainWindow.webContents.setWindowOpenHandler((edata) => {
      shell.openExternal(edata.url);
      return { action: 'deny' };
    });

    return this.mainWindow;
  }
}
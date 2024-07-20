import { BrowserWindow, ipcMain } from 'electron';
import path from 'path';

export class AudioRecorder {
  private mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  setupListeners() {
    ipcMain.on('start-recording', this.startRecording.bind(this));
    ipcMain.on('stop-recording', this.stopRecording.bind(this));
  }

  private startRecording() {
    this.mainWindow.webContents.send('recording-started');
  }

  private stopRecording() {
    this.mainWindow.webContents.send('recording-stopped');
  }
}
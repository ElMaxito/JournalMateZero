import { BrowserWindow, ipcMain } from 'electron';
import { FileManager } from './fileManager';

export class AudioRecorder {
  private mainWindow: BrowserWindow;
  private fileManager: FileManager;

  constructor(mainWindow: BrowserWindow, fileManager: FileManager) {
    this.mainWindow = mainWindow;
    this.fileManager = fileManager;
  }

  setupListeners() {
    ipcMain.handle('start-recording', this.startRecording.bind(this));
    ipcMain.handle('stop-recording', this.stopRecording.bind(this));
  }

  private startRecording() {
    this.mainWindow.webContents.send('recording-started');
    return 'Recording started';
  }

  private async stopRecording(event: Electron.IpcMainInvokeEvent, buffer: Buffer) {
    const fileName = `recording_${new Date().toISOString()}.mp3`;
    const filePath = await this.fileManager.saveRecording(buffer, fileName);
    this.mainWindow.webContents.send('recording-stopped', filePath);
    return filePath;
  }
}
import { ipcMain } from 'electron';
import { FileManager } from './fileManager';

export function setupIpcHandlers(fileManager: FileManager) {
  ipcMain.handle('save-recording', (event, buffer: Buffer, filename: string) => {
    return fileManager.saveRecording(buffer, filename);
  });

  ipcMain.handle('get-recordings', () => {
    return fileManager.getRecordings();
  });
}
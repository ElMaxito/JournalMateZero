import { ipcMain } from 'electron';
import { FileManager } from './fileManager';

export function setupIpcHandlers(fileManager: FileManager) {
  ipcMain.handle('save-recording', async (_, buffer: number[], timestamp: number) => {
    const uint8Array = new Uint8Array(buffer);
    return await fileManager.saveRecording(uint8Array, timestamp);
  });

  ipcMain.handle('get-recordings', async () => {
    return await fileManager.getRecordings();
  });
}
import fs from 'fs';
import path from 'path';

export class FileManager {
  private recordingsPath: string;

  constructor() {
    this.recordingsPath = path.join(__dirname, '..', 'recordings');
    this.ensureRecordingsDirExists();
  }

  private ensureRecordingsDirExists() {
    if (!fs.existsSync(this.recordingsPath)) {
      fs.mkdirSync(this.recordingsPath, { recursive: true });
    }
  }

  async saveRecording(buffer: Uint8Array, timestamp: number): Promise<string> {
    const date = new Date(timestamp);
    const formattedDate = date.toISOString().replace(/:/g, '-').replace(/\..+/, '');
    const fileName = `recording_${formattedDate}.webm`;
    const filePath = path.join(this.recordingsPath, fileName);
    await fs.promises.writeFile(filePath, Buffer.from(buffer));
    
    console.log('Saved file size:', (await fs.promises.stat(filePath)).size);
    
    return filePath;
  }

  async getRecordings(): Promise<{ name: string; date: Date; path: string }[]> {
    const files = await fs.promises.readdir(this.recordingsPath);
    return files.map(file => {
      const filePath = path.join(this.recordingsPath, file);
      return {
        name: file,
        date: fs.statSync(filePath).birthtime,
        path: filePath
      };
    });
  }
}
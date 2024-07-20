import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export class FileManager {
  private recordingsPath: string;

  constructor() {
    this.recordingsPath = path.join(app.getPath('userData'), 'recordings');
    this.ensureRecordingsDirExists();
  }

  private ensureRecordingsDirExists() {
    if (!fs.existsSync(this.recordingsPath)) {
      fs.mkdirSync(this.recordingsPath, { recursive: true });
    }
  }

  saveRecording(buffer: Buffer, filename: string): string {
    const filePath = path.join(this.recordingsPath, filename);
    fs.writeFileSync(filePath, buffer);
    return filePath;
  }

  getRecordings(): { name: string; date: Date }[] {
    return fs.readdirSync(this.recordingsPath).map((file) => ({
      name: file,
      date: fs.statSync(path.join(this.recordingsPath, file)).birthtime,
    }));
  }
}
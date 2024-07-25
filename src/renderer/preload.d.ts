import { ElectronHandler } from '../main/preload';

declare global {
  interface Window {
    electron: ElectronHandler & {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>;
      }
    };
  }
}

export {};
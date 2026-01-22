import * as path from 'node:path';

import { app, BrowserWindow } from 'electron';

const DEV_ENV: string = 'development';
const INDEX_PATH: string = '/dist-angular/browser/index.html';
const FILE_URL: string = 'http://localhost:4200';
const WIDTH: number = 800;
const HEIGHT: number = 600;

function createWindow(): void {
  const browser: BrowserWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
  });

  if (process.env.NODE_ENV === DEV_ENV) {
    browser.loadURL(FILE_URL).then();
  } else {
    browser.loadFile(path.join(app.getAppPath(), INDEX_PATH)).then();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

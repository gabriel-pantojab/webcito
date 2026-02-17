import { join } from 'path';

import { app, BrowserWindow } from 'electron';

import { BrowserConfig } from './config/browser-config';

const DEV_ENV: string = 'development';
const INDEX_PATH: string = '/dist-angular/browser/index.html';
const FILE_URL: string = 'http://localhost:4200';
const WIDTH: number = 1128;
const HEIGHT: number = 700;

const browserConfig: BrowserConfig = BrowserConfig.getInstance();

function createWindow(): void {
  const browser: BrowserWindow = new BrowserWindow({
    width: WIDTH,
    height: HEIGHT,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
    },
  });

  if (process.env['NODE_ENV'] === DEV_ENV) {
    browser.loadURL(FILE_URL).then();
  } else {
    browser.loadFile(join(app.getAppPath(), INDEX_PATH)).then();
  }
}

app.whenReady().then(() => {
  createWindow();
  browserConfig.registerBrowserActions();

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

const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')

const indexPath: string = '/dist-angular/browser/index.html';

function createWindow (): void {
  const browser = new BrowserWindow({
    width: 800,
    height: 600,
    /*webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }*/
  })

  browser.loadFile(path.join(app.getAppPath(), indexPath)).then();
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

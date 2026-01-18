import { contextBridge, ipcRenderer } from 'electron';

enum BrowserEvents {
  OPEN_PAGE = "OPEN_PAGE",
  FILL_FORM_INPUT = "FILL_FORM_INPUT",
  CLICK = "CLICK",
}

function config(): void {
  contextBridge.exposeInMainWorld('electronAPI', {
    browser: {
      openPage: (pageId: string, url: string) => ipcRenderer.invoke(BrowserEvents.OPEN_PAGE, pageId, url),
      fillFormInput: (pageId: string, selector: string, value: string | number) => ipcRenderer.invoke(BrowserEvents.FILL_FORM_INPUT, pageId, selector, value),
      click: (pageId: string, selector: string) => ipcRenderer.invoke(BrowserEvents.CLICK, pageId, selector)
    }
  });
}

config();

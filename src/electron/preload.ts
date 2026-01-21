import { contextBridge, ipcRenderer } from 'electron';

enum BrowserActions {
  OPEN_PAGE = "OPEN_PAGE",
  CLOSE_PAGE = "CLOSE_PAGE",
  SET_VALUE = "SET_VALUE",
  CLICK_ELEMENT = "CLICK_ELEMENT",
}

function preload(): void {
  contextBridge.exposeInMainWorld('electronAPI', {
    browser: {
      openPage: (pageId: string, url: string) => ipcRenderer.invoke(BrowserActions.OPEN_PAGE, pageId, url),
      closePage: (pageId: string) => ipcRenderer.invoke(BrowserActions.CLOSE_PAGE, pageId),
      setValue: (pageId: string, selector: string, value: string | number) => ipcRenderer.invoke(BrowserActions.SET_VALUE, pageId, selector, value),
      clickElement: (pageId: string, selector: string) => ipcRenderer.invoke(BrowserActions.CLICK_ELEMENT, pageId, selector)
    }
  });
}

preload();

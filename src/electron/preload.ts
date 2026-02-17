import { contextBridge, ipcRenderer } from 'electron';

enum BrowserActions {
  OPEN_PAGE = 'OPEN_PAGE',
  CLOSE_PAGE = 'CLOSE_PAGE',
  SET_VALUE = 'SET_VALUE',
  CLICK_ELEMENT = 'CLICK_ELEMENT',
  ENABLE_ELEMENT = 'ENABLE_ELEMENT',
  DISABLE_ELEMENT = 'DISABLE_ELEMENT',
  IS_DISABLED = 'IS_DISABLED',
}

function preload(): void {
  contextBridge.exposeInMainWorld('electronAPI', {
    browser: {
      openPage: (pageId: string, url: string) =>
        ipcRenderer.invoke(BrowserActions.OPEN_PAGE, pageId, url),
      closePage: (pageId: string) =>
        ipcRenderer.invoke(BrowserActions.CLOSE_PAGE, pageId),
      setValue: (pageId: string, selector: string, value: string) =>
        ipcRenderer.invoke(BrowserActions.SET_VALUE, pageId, selector, value),
      clickElement: (pageId: string, selector: string) =>
        ipcRenderer.invoke(BrowserActions.CLICK_ELEMENT, pageId, selector),
      enableElement: (pageId: string, selector: string) =>
        ipcRenderer.invoke(BrowserActions.ENABLE_ELEMENT, pageId, selector),
      disableElement: (pageId: string, selector: string) =>
        ipcRenderer.invoke(BrowserActions.DISABLE_ELEMENT, pageId, selector),
      isDisabledElement: (pageId: string, selector: string) =>
        ipcRenderer.invoke(BrowserActions.IS_DISABLED, pageId, selector),
    },
  });
}

preload();

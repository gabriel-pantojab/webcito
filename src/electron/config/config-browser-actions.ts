import {ipcMain} from 'electron';
import {clickElement, setValue, openPage, closePage} from '../scripts/browser';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {BrowserActions} from '../types/browser-actions';

export function configBrowserActions(): void {
  ipcMain.handle(BrowserActions.OPEN_PAGE, (_: IpcMainInvokeEvent, pageId: string, url: string) => openPage(pageId, url));
  ipcMain.handle(BrowserActions.CLOSE_PAGE, (_:IpcMainInvokeEvent, pageId: string) => closePage(pageId));
  ipcMain.handle(BrowserActions.SET_VALUE, (_: IpcMainInvokeEvent, pageId: string, selector: string, value: string | number) => setValue(pageId, selector, value));
  ipcMain.handle(BrowserActions.CLICK_ELEMENT, (_: IpcMainInvokeEvent, pageId: string, selector: string) => clickElement(pageId, selector));
}

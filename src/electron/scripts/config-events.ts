import {ipcMain} from 'electron';
import {click, fillFormInput, openPage} from './browser';
import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;
import {BrowserEvents} from '../types/events';

export function configEvents(): void {
  ipcMain.handle(BrowserEvents.OPEN_PAGE, (event: IpcMainInvokeEvent, pageId: string, url: string) => openPage(pageId, url));
  ipcMain.handle(BrowserEvents.FILL_FORM_INPUT, (event: IpcMainInvokeEvent, pageId: string, selector: string, value: string | number) => fillFormInput(pageId, selector, value));
  ipcMain.handle(BrowserEvents.CLICK, (event: IpcMainInvokeEvent, pageId: string, selector: string) => click(pageId, selector));
}

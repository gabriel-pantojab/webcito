import { ipcMain } from 'electron';

import { Browser } from '../browser/browser';
import { BrowserActions } from '../types/browser-actions';

import IpcMainInvokeEvent = Electron.IpcMainInvokeEvent;

export class BrowserConfig {
  static #instance: BrowserConfig;

  readonly #browser: Browser;
  #handlersRegistered: boolean;

  private constructor() {
    this.#browser = Browser.getInstance();
    this.#handlersRegistered = false;
  }

  public static getInstance(): BrowserConfig {
    if (!BrowserConfig.#instance) BrowserConfig.#instance = new BrowserConfig();
    return BrowserConfig.#instance;
  }

  public getBrowser(): Browser {
    return this.#browser;
  }

  public registerBrowserActions(): void {
    if (this.#handlersRegistered) {
      throw new Error(
        'Browser handlers are already registered. Cannot register handlers twice.',
      );
    }

    ipcMain.handle(
      BrowserActions.OPEN_PAGE,
      (_: IpcMainInvokeEvent, pageId: string, url: string) =>
        this.#browser.openPage(pageId, url),
    );
    ipcMain.handle(
      BrowserActions.CLOSE_PAGE,
      (_: IpcMainInvokeEvent, pageId: string) =>
        this.#browser.closePage(pageId),
    );
    ipcMain.handle(
      BrowserActions.SET_VALUE,
      (
        _: IpcMainInvokeEvent,
        pageId: string,
        selector: string,
        value: string,
      ) => this.#browser.setValue(pageId, selector, value),
    );
    ipcMain.handle(
      BrowserActions.CLICK_ELEMENT,
      (_: IpcMainInvokeEvent, pageId: string, selector: string) =>
        this.#browser.clickElement(pageId, selector),
    );
    ipcMain.handle(
      BrowserActions.ENABLE_ELEMENT,
      (_: IpcMainInvokeEvent, pageId: string, selector: string) =>
        this.#browser.enableElement(pageId, selector),
    );
    ipcMain.handle(
      BrowserActions.DISABLE_ELEMENT,
      (_: IpcMainInvokeEvent, pageId: string, selector: string) =>
        this.#browser.disableElement(pageId, selector),
    );
    ipcMain.handle(
      BrowserActions.IS_DISABLED,
      (_: IpcMainInvokeEvent, pageId: string, selector: string) =>
        this.#browser.isDisabledElement(pageId, selector),
    );
    this.#handlersRegistered = true;
  }
}

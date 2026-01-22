export {};
declare global {
  interface Window {
    electronAPI: {
      browser: {
        openPage(pageId: string, url: string): Promise<void>;
        closePage(pageId: string): Promise<void>;
        setValue(pageId: string, selector: string, value: string | number): Promise<void>;
        clickElement(pageId: string, selector: string): Promise<void>;
      }
    }
  }
}

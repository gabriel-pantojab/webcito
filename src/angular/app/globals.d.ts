export {};
declare global {
  interface Window {
    electronAPI: {
      browser: {
        openPage(pageId: string, url: string): Promise<void>;
        fillFormInput(pageId: string, selector: string, value: string | number): Promise<void>;
        click(pageId: string, selector: string): Promise<void>;
      }
    }
  }
}

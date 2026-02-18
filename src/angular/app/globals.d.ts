import { LoginRequest } from '@core/interfaces/login-request';

export {};
declare global {
  interface Window {
    electronAPI: {
      browser: {
        openPage(pageId: string, url: string): Promise<void>;
        closePage(pageId: string): Promise<void>;
        setValue(
          pageId: string,
          selector: string,
          value: string | number,
        ): Promise<void>;
        clickElement(pageId: string, selector: string): Promise<void>;
        enableElement(pageId: string, selector: string): Promise<void>;
        disableElement(pageId: string, selector: string): Promise<void>;
        isDisabledElement(pageId: string, selector: string): Promise<boolean>;
      };
      websis: {
        open(): Promise<void>;
        login(request: LoginRequest): Promise<void>;
      };
    };
  }
}

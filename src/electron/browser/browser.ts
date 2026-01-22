import {
  Browser as PlaywrightBrowser,
  chromium,
  Locator,
  Page,
} from 'playwright';

export class Browser {
  static #instance: Browser;

  #browser: PlaywrightBrowser | null;
  #pages: Map<string, Page>;

  private constructor() {
    this.#browser = null;
    this.#pages = new Map<string, Page>();
    this.#initializeBrowser().then();
  }

  public static getInstance(): Browser {
    if (!Browser.#instance) Browser.#instance = new Browser();
    return Browser.#instance;
  }

  async #initializeBrowser(): Promise<void> {
    this.#browser = await chromium.launch({ headless: false });
  }

  public async openPage(name: string, url: string): Promise<void> {
    if (!this.#browser) {
      throw new Error('Browser does not exist');
    }

    if (this.#pages.has(name)) {
      throw new Error('Page already exists');
    }

    const page: Page = await this.#browser.newPage();

    page.on('close', () => {
      this.#pages.delete(name);
    });

    this.#pages.set(name, page);
    await page.goto(url);
    await page.waitForLoadState('domcontentloaded');
  }

  public async closePage(name: string): Promise<void> {
    const page: Page | undefined = this.#pages.get(name);
    if (!page) {
      throw new Error('Page does not exist');
    }

    await page.close();
    this.#pages.delete(name);
  }

  public async findElement(
    pageName: string,
    selector: string,
  ): Promise<Locator | null> {
    const page: Page | undefined = this.#pages.get(pageName);
    if (!page) {
      throw new Error('Page does not exist');
    }

    const locator: Locator = page.locator(selector);

    if (!(await locator.count())) {
      return null;
    }

    return locator;
  }

  public async setValue(
    pageName: string,
    selector: string,
    value: string,
  ): Promise<void> {
    const locator: Locator | null = await this.findElement(pageName, selector);

    if (!locator) {
      throw new Error(`Element not found: ${selector}`);
    }
    const tagName: string = await locator.evaluate(
      (element: HTMLElement) => element.tagName,
    );
    if (!tagName) return;

    if (tagName === 'INPUT') {
      await locator.clear();
      await locator.fill(value.toString());
      return;
    }

    if (tagName === 'SELECT') {
      await locator.selectOption(value.toString());
    }
  }

  public async clickElement(pageName: string, selector: string): Promise<void> {
    const locator: Locator | null = await this.findElement(pageName, selector);
    if (!locator) {
      throw new Error(`Element not found: ${selector}`);
    }
    await locator.click();
  }
}

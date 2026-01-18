import {chromium, Locator, Page} from 'playwright';

const PAGES: Map<string, Page> = new Map();

export function deletePage(pageId: string): void {
  if(!PAGES.has(pageId)) throw Error(`Page ${pageId} doesn't exist`);
  PAGES.delete(pageId);
}

export async function openPage(pageId: string, url: string): Promise<void> {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();
  PAGES.set(pageId, page);
  await page.goto(url);
}

export async function fillFormInput(pageId: string, selector: string, value: string | number): Promise<void> {
  const page: Page | undefined = PAGES.get(pageId);
  if(!page) {
    throw new Error(`Page ${pageId} not found`);
  }

  const locator: Locator = page.locator(selector);

  if (await locator.count() === 0) {
    throw new Error(`Element not found: ${selector}`);
  }

  const tagName: string = await locator.evaluate(element => element.tagName);
  if(!tagName) return;

  if(tagName === 'INPUT') {
    await locator.clear();
    await locator.fill(value.toString());
    return;
  }

  if(tagName === 'SELECT') {
    await locator.selectOption(value.toString());
  }
}

export async function click(pageId: string, selector: string): Promise<void> {
  const page: Page | undefined = PAGES.get(pageId);
  if(!page) {
    throw new Error(`Page ${pageId} not found`);
  }

  await page.locator(selector).click();
}

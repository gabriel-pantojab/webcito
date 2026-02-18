import { WEBSIS } from '../types/constants/websis-config';
import { LoginRequest } from '../types/websis/login-request';

import { Browser } from './browser';

export class EnrollmentAutomation {
  static #instance: EnrollmentAutomation;

  #browser: Browser;

  readonly #PAGE_ID: string = 'WEBSIS';

  private constructor() {
    this.#browser = Browser.getInstance();
  }

  static getInstance(): EnrollmentAutomation {
    if (!EnrollmentAutomation.#instance) {
      EnrollmentAutomation.#instance = new EnrollmentAutomation();
    }
    return EnrollmentAutomation.#instance;
  }

  async openWebsis(): Promise<void> {
    const {
      login: { captchaSelector, submitSelector },
    } = WEBSIS;

    await this.#browser.openPage(this.#PAGE_ID, WEBSIS.url);
    await this.#browser.disableElement(this.#PAGE_ID, captchaSelector);
    await this.#browser.disableElement(this.#PAGE_ID, submitSelector);
  }

  async login(data: LoginRequest): Promise<void> {
    const { sis, password, birthday, captcha } = data;
    const {
      login: {
        sisSelector,
        passwordSelector,
        daySelector,
        monthSelector,
        yearSelector,
        captchaSelector,
        submitSelector,
      },
    } = WEBSIS;

    await this.#browser.setValue(this.#PAGE_ID, sisSelector, sis);
    await this.#browser.setValue(this.#PAGE_ID, passwordSelector, password);
    await this.#browser.setValue(this.#PAGE_ID, daySelector, birthday.day);
    await this.#browser.setValue(this.#PAGE_ID, monthSelector, birthday.month);
    await this.#browser.setValue(this.#PAGE_ID, yearSelector, birthday.year);

    await this.#browser.enableElement(this.#PAGE_ID, captchaSelector);
    await this.#browser.setValue(this.#PAGE_ID, captchaSelector, captcha);
    await this.#browser.disableElement(this.#PAGE_ID, captchaSelector);

    await this.#browser.enableElement(this.#PAGE_ID, submitSelector);
    await this.#browser.clickElement(this.#PAGE_ID, submitSelector);
    await this.#browser.disableElement(this.#PAGE_ID, submitSelector);
  }
}

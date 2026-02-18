import { ipcMain, IpcMainInvokeEvent } from 'electron';

import { EnrollmentAutomation } from '../browser/enrollment-automation';
import { EnrollmentEvents } from '../types/enums/enrollment-events';
import { LoginRequest } from '../types/websis/login-request';

export class EnrollmentAutomationConfig {
  static #instance: EnrollmentAutomationConfig;

  readonly #enrollmentAutomation: EnrollmentAutomation;

  #handlersRegistered: boolean;

  private constructor() {
    this.#enrollmentAutomation = EnrollmentAutomation.getInstance();
    this.#handlersRegistered = false;
  }

  static getInstance(): EnrollmentAutomationConfig {
    if (!EnrollmentAutomationConfig.#instance) {
      EnrollmentAutomationConfig.#instance = new EnrollmentAutomationConfig();
    }
    return EnrollmentAutomationConfig.#instance;
  }

  registerEnrollmentEvents(): void {
    if (this.#handlersRegistered) {
      throw new Error(
        'Enrollment handlers are already registered. Cannot register handlers twice.',
      );
    }

    ipcMain.handle(EnrollmentEvents.OPEN_WEBSIS, () =>
      this.#enrollmentAutomation.openWebsis(),
    );

    ipcMain.handle(
      EnrollmentEvents.LOGIN,
      (_: IpcMainInvokeEvent, data: LoginRequest) =>
        this.#enrollmentAutomation.login(data),
    );

    this.#handlersRegistered = true;
  }
}

import { inject, Injectable } from '@angular/core';

import { EnrollmentState } from '@core/state-management/enrollment-state';

import { EnrollmentStep } from '../types/enrollment-step';
import { EnrollmentStepType } from '../types/enums/enrollment-step-type';

@Injectable()
export class EnrollmentSetupFacade {
  readonly #store: EnrollmentState = inject(EnrollmentState);

  saveStepInformation(stepData: EnrollmentStep): void {
    if (stepData.type === EnrollmentStepType.USER_INFO) {
      this.#store.setStudent({
        sis: stepData.sis,
        birthday: stepData.birthdate,
        password: stepData.password,
      });
      return;
    }

    if (stepData.type === EnrollmentStepType.CODES) {
      this.#store.setCodes(stepData.codes);
      return;
    }

    this.#store.setCourses(stepData.courses);
  }
}

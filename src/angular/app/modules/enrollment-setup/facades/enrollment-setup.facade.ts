import { inject, Injectable, Signal } from '@angular/core';

import { Course } from '@core/models/course';
import { Enrollment } from '@core/models/enrollment';
import { Student } from '@core/models/student';
import { EnrollmentState } from '@core/state-management/enrollment-state';

import { EnrollmentStep } from '../types/enrollment-step';
import { EnrollmentStepType } from '../types/enums/enrollment-step-type';

@Injectable()
export class EnrollmentSetupFacade {
  readonly #store: EnrollmentState = inject(EnrollmentState);

  saveStepInformation(stepData: EnrollmentStep): void {
    if (stepData.type === EnrollmentStepType.BASIC_INFO) {
      this.#store.setStudent({
        sis: stepData.sis,
        birthday: stepData.birthdate,
        password: stepData.password,
      });
      this.#store.setCodes(stepData.codes);

      return;
    }

    this.#store.setCourses(stepData.courses);
  }

  getEnrollment(): Signal<Enrollment> {
    return this.#store.selectEnrollment();
  }

  getStudent(): Signal<Student> {
    return this.#store.selectStudent();
  }

  getCodes(): Signal<string[]> {
    return this.#store.selectCodes();
  }

  getCourses(): Signal<Course[]> {
    return this.#store.selectCourses();
  }
}

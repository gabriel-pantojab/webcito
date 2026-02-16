import { computed, inject, Injectable, Signal } from '@angular/core';

import { Course } from '@core/models/course';
import { EnrollmentState } from '@core/state-management/enrollment-state';

import { BasicInformationType } from '../types/basic-information-type';

@Injectable()
export class EnrollmentProcessFacade {
  #store: EnrollmentState = inject(EnrollmentState);

  getStudentAndCodes(): Signal<BasicInformationType> {
    return computed(() => ({
      student: this.#store.selectStudent()(),
      codes: this.#store.selectCodes()(),
    }));
  }

  getCourses(): Signal<Course[]> {
    return computed(() => this.#store.selectCourses()());
  }
}

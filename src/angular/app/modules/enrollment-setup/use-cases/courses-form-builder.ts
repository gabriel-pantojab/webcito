import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Course } from '@core/models/course';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';

@Injectable()
export class CoursesFormBuilder implements EnrollmentFormBuilderStrategy {
  #formBuilder: FormBuilder = inject(FormBuilder);

  public invoke(): FormGroup {
    return this.#formBuilder.group({
      courses: this.#formBuilder.array<Course>([]),
    });
  }
}

import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subject } from '@core/types/domain/subject';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';

@Injectable()
export class SubjectsFormBuilder implements EnrollmentFormBuilderStrategy {
  #formBuilder: FormBuilder = inject(FormBuilder);

  public invoke(): FormGroup {
    return this.#formBuilder.group({
      subjects: this.#formBuilder.array<Subject>([]),
    });
  }
}

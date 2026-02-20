import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';

@Injectable()
export class UserInfoFormBuilder implements EnrollmentFormBuilderStrategy {
  #formBuilder: FormBuilder = inject(FormBuilder);

  public invoke(): FormGroup {
    return this.#formBuilder.group({
      sis: ['', [Validators.required]],
      password: ['', [Validators.required]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      codes: this.#formBuilder.array(
        Array.from({ length: 5 }, () =>
          this.#formBuilder.control('', [Validators.required]),
        ),
      ),
    });
  }
}

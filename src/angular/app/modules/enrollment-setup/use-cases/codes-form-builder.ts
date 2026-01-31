import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';

@Injectable()
export class CodesFormBuilder implements EnrollmentFormBuilderStrategy {
  #formBuilder: FormBuilder = inject(FormBuilder);

  public invoke(): FormGroup {
    return this.#formBuilder.group({
      codeOne: ['', [Validators.required]],
      codeTwo: ['', [Validators.required]],
      codeThree: ['', [Validators.required]],
      codeFour: ['', [Validators.required]],
      codeFive: ['', [Validators.required]],
    });
  }
}

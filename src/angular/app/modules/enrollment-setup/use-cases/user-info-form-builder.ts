import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';

@Injectable({
  providedIn: 'root',
})
export class UserInfoFormBuilder implements EnrollmentFormBuilderStrategy {
  #formBuilder: FormBuilder = inject(FormBuilder);

  public invoke(): FormGroup {
    return this.#formBuilder.group({
      sis: ['', [Validators.required]],
      password: ['', [Validators.required]],
      birthdate: ['', [Validators.required]],
    });
  }
}

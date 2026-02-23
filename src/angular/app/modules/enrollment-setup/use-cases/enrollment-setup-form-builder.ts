import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UseCase } from '@core/interfaces/use-case';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';
import { EnrollmentStepType } from '../types/enums/enrollment-step-type';

import { CoursesFormBuilder } from './courses-form-builder';
import { UserInfoFormBuilder } from './user-info-form-builder';

@Injectable()
export class EnrollmentSetupFormBuilder implements UseCase<
  EnrollmentStepType,
  FormGroup
> {
  #userInfoBuilder: UserInfoFormBuilder = inject(UserInfoFormBuilder);
  #coursesBuilder: CoursesFormBuilder = inject(CoursesFormBuilder);

  public invoke(args: EnrollmentStepType): FormGroup {
    const builder: EnrollmentFormBuilderStrategy = this.#getBuilder(args);
    return builder.invoke();
  }

  #getBuilder(type: EnrollmentStepType): EnrollmentFormBuilderStrategy {
    if (type === EnrollmentStepType.BASIC_INFO) return this.#userInfoBuilder;
    return this.#coursesBuilder;
  }
}

import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { UseCase } from '@core/types/use-case';

import { EnrollmentFormBuilderStrategy } from '../types/enrollment-form-builder-strategy';
import { EnrollmentStepType } from '../types/enums/enrollment-step-type';

import { CodesFormBuilder } from './codes-form-builder';
import { SubjectsFormBuilder } from './subjects-form-builder';
import { UserInfoFormBuilder } from './user-info-form-builder';

@Injectable()
export class EnrollmentSetupFormBuilder implements UseCase<
  EnrollmentStepType,
  FormGroup
> {
  #userInfoBuilder: UserInfoFormBuilder = inject(UserInfoFormBuilder);
  #codesBuilder: CodesFormBuilder = inject(CodesFormBuilder);
  #subjectsBuilder: SubjectsFormBuilder = inject(SubjectsFormBuilder);

  public invoke(args: EnrollmentStepType): FormGroup {
    const builder: EnrollmentFormBuilderStrategy = this.#getBuilder(args);
    return builder.invoke();
  }

  #getBuilder(type: EnrollmentStepType): EnrollmentFormBuilderStrategy {
    if (type === EnrollmentStepType.USER_INFO) return this.#userInfoBuilder;
    if (type === EnrollmentStepType.CODES) return this.#codesBuilder;
    return this.#subjectsBuilder;
  }
}

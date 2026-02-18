import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Course } from '@core/models/course';
import { Enrollment } from '@core/models/enrollment';

import { CodesFormBuilder } from '../../use-cases/codes-form-builder';
import { CoursesFormBuilder } from '../../use-cases/courses-form-builder';
import { EnrollmentSetupFormBuilder } from '../../use-cases/enrollment-setup-form-builder';
import { UserInfoFormBuilder } from '../../use-cases/user-info-form-builder';

import { UserInfoStep } from '../../types/enrollment-step';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';
import { StepSubmitEvent } from '../../types/step-submit-event';

import { CoursesForm } from '../courses-form/courses-form';
import { UserInfoForm } from '../user-info-form/user-info-form';

@Component({
  selector: 'wizard',
  imports: [UserInfoForm, CoursesForm],
  providers: [
    EnrollmentSetupFormBuilder,
    UserInfoFormBuilder,
    CodesFormBuilder,
    CoursesFormBuilder,
  ],
  templateUrl: './wizard.html',
  styleUrl: './wizard.scss',
})
export class Wizard {
  enrollment: InputSignal<Enrollment> = input.required();
  eventSubmitStepData: OutputEmitterRef<StepSubmitEvent> = output();

  protected currentStep: WritableSignal<number> = signal(1);
  protected form: Signal<FormGroup> = computed((): FormGroup => {
    if (this.currentStep() === this.USER_INFO_STEP)
      return this.#formBuilder.invoke(EnrollmentStepType.USER_INFO);
    return this.#formBuilder.invoke(EnrollmentStepType.COURSES);
  });

  protected readonly USER_INFO_STEP: number = 1;
  protected readonly COURSE_STEP: number = 2;
  protected readonly TOTAL_STEPS: number = 2;

  #formBuilder: EnrollmentSetupFormBuilder = inject(EnrollmentSetupFormBuilder);

  protected handleSubmitStepData(shouldFinish?: boolean): void {
    if (this.currentStep() === this.USER_INFO_STEP) {
      this.eventSubmitStepData.emit({
        data: {
          ...(this.form().value as UserInfoStep),
          type: EnrollmentStepType.USER_INFO,
        },
        shouldFinish: !!shouldFinish,
      });
      return;
    }

    this.eventSubmitStepData.emit({
      data: {
        type: EnrollmentStepType.COURSES,
        courses: [...(this.form().value.courses as Course[])],
      },
      shouldFinish: !!shouldFinish,
    });
  }

  protected nextStep(): void {
    if (this.currentStep() === this.TOTAL_STEPS) return;
    this.handleSubmitStepData();
    this.currentStep.update((prev) => prev + 1);
  }

  protected previousStep(): void {
    if (this.currentStep() === 1) return;
    this.handleSubmitStepData();
    this.currentStep.update((prev) => prev - 1);
  }

  protected continueProcess(): void {
    this.handleSubmitStepData(true);
  }
}

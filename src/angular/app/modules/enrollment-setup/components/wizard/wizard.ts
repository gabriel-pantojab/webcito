import {
  Component,
  computed,
  inject,
  output,
  OutputEmitterRef,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CodesFormBuilder } from '../../use-cases/codes-form-builder';
import { EnrollmentSetupFormBuilder } from '../../use-cases/enrollment-setup-form-builder';
import { SubjectsFormBuilder } from '../../use-cases/subjects-form-builder';
import { UserInfoFormBuilder } from '../../use-cases/user-info-form-builder';

import { EnrollmentSetup, UserInfoStep } from '../../types/enrollment-setup';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';

import { CodesForm } from '../codes-form/codes-form';
import { SubjectsForm } from '../subjects-form/subjects-form';
import { UserInfoForm } from '../user-info-form/user-info-form';

@Component({
  selector: 'wizard',
  imports: [UserInfoForm, CodesForm, SubjectsForm],
  providers: [
    EnrollmentSetupFormBuilder,
    UserInfoFormBuilder,
    CodesFormBuilder,
    SubjectsFormBuilder,
  ],
  templateUrl: './wizard.html',
  styleUrl: './wizard.scss',
})
export class Wizard {
  public eventSubmitStepData: OutputEmitterRef<EnrollmentSetup> = output();

  protected currentStep: WritableSignal<number> = signal(1);
  protected form: Signal<FormGroup> = computed((): FormGroup => {
    if (this.currentStep() === this.USER_INFO_STEP)
      return this.#formBuilder.invoke(EnrollmentStepType.USER_INFO);
    if (this.currentStep() === this.CODES_STEP)
      return this.#formBuilder.invoke(EnrollmentStepType.CODES);
    return this.#formBuilder.invoke(EnrollmentStepType.SUBJECTS);
  });

  protected readonly USER_INFO_STEP: number = 1;
  protected readonly CODES_STEP: number = 2;
  protected readonly SUBJECTS_STEP: number = 3;
  protected readonly TOTAL_STEPS: number = 3;

  #formBuilder: EnrollmentSetupFormBuilder = inject(EnrollmentSetupFormBuilder);

  public handleSubmitStepData(): void {
    if (this.currentStep() === this.USER_INFO_STEP) {
      this.eventSubmitStepData.emit({
        ...(this.form().value as UserInfoStep),
        type: EnrollmentStepType.USER_INFO,
      });
      return;
    }

    if (this.currentStep() === this.CODES_STEP) {
      this.eventSubmitStepData.emit({
        type: EnrollmentStepType.CODES,
        codes: Object.values(this.form().value),
      });
      return;
    }

    this.eventSubmitStepData.emit({
      type: EnrollmentStepType.SUBJECTS,
      subjects: Object.values(this.form().value),
    });
  }

  public nextStep(): void {
    if (this.currentStep() === this.TOTAL_STEPS) return;
    this.handleSubmitStepData();
    this.currentStep.update((prev) => prev + 1);
  }

  public previousStep(): void {
    if (this.currentStep() === 1) return;
    this.currentStep.update((prev) => prev - 1);
  }

  public continueProcess(): void {
    this.handleSubmitStepData();
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Student } from '@core/models/student';

import { Wizard } from '@/shared/components/wizard/wizard';
import { ENROLLMENT_WIZARD_STEPS } from '@/shared/constants/enrollment-setup-steps';
import { IWizardStep } from '@/shared/interfaces/wizard-step';

import { BasicInfoStep } from '../../types/enrollment-step';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';

@Component({
  selector: 'user-info-form',
  imports: [ReactiveFormsModule, CommonModule, Wizard],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.scss',
})
export class UserInfoForm implements OnInit {
  codes: InputSignal<string[] | undefined> = input();
  student: InputSignal<Student | undefined> = input();

  form: ModelSignal<FormGroup> = model.required();

  submitData: OutputEmitterRef<BasicInfoStep> = output();
  goBack: OutputEmitterRef<void> = output();

  protected showPassword: WritableSignal<boolean> = signal(false);
  protected years: WritableSignal<number[]> = signal([]);

  readonly STEPS: IWizardStep[] = ENROLLMENT_WIZARD_STEPS;
  readonly CURRENT_STEP: number = 1;
  readonly MONTHS: { value: number; name: string }[] = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  ngOnInit(): void {
    this.#initialize();
  }

  get codesArray(): FormArray {
    return this.form().get('codes') as FormArray;
  }

  protected handleSubmitData(): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any = this.form().value;

    this.submitData.emit({
      ...value,
      birthdate: {
        day: value.day,
        month: value.month,
        year: value.year,
      },
      type: EnrollmentStepType.BASIC_INFO,
    });
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  #initialize(): void {
    this.#generateYears();
    const student: Student | undefined = this.student();
    const codes: string[] | undefined = this.codes();
    if (student && codes) {
      this.form().setValue({
        sis: student.sis,
        password: student.password,
        day: student.birthday.day,
        month: student.birthday.month,
        year: student.birthday.year,
        codes: Array.from({ length: 5 }, (_, i) => codes[i] || ''),
      });
    }
  }

  #generateYears(): void {
    const currentYear: number = new Date().getFullYear();
    const maxYear: number = currentYear - 15;
    const years: number[] = [];

    for (let year: number = maxYear; year >= 1920; year--) {
      years.push(year);
    }

    this.years.set(years);
  }
}

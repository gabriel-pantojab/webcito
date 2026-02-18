import { CommonModule } from '@angular/common';
import {
  Component,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Student } from '@core/models/student';

@Component({
  selector: 'user-info-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.scss',
})
export class UserInfoForm implements OnInit {
  codes: InputSignal<string[] | undefined> = input();
  student: InputSignal<Student | undefined> = input();

  form: ModelSignal<FormGroup> = model.required();

  showPassword: WritableSignal<boolean> = signal(false);
  years: number[] = [];

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

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  generateYears(): void {
    const currentYear: number = new Date().getFullYear();
    const maxYear: number = currentYear - 15;

    for (let year: number = maxYear; year >= 1920; year--) {
      this.years.push(year);
    }
  }

  #initialize(): void {
    this.generateYears();
    const student: Student | undefined = this.student();
    const codes: string[] | undefined = this.codes();
    if (student && codes) {
      this.form().setValue({
        sis: student.sis,
        password: student.password,
        day: '',
        month: '',
        year: '',
        codes: Array.from({ length: 5 }, (_, i) => codes[i] || ''),
      });
    }
  }
}
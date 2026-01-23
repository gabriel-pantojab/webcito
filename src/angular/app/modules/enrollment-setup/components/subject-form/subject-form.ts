import { Component, output, OutputEmitterRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Subject } from '@core/types/domain/subject';

@Component({
  selector: 'subject-form',
  imports: [ReactiveFormsModule],
  templateUrl: './subject-form.html',
  styleUrl: './subject-form.scss',
})
export class SubjectForm {
  public eventAddSubject: OutputEmitterRef<Subject> = output();
  public eventCancel: OutputEmitterRef<void> = output();

  protected form: FormGroup;

  constructor() {
    this.form = this.#buildForm();
  }

  public handleAddSubject(): void {
    if (this.form.invalid) return;
    this.eventAddSubject.emit(this.form.value);
    this.form.reset();
  }

  public cancel(): void {
    this.form.reset();
    this.eventCancel.emit();
  }

  #buildForm(): FormGroup {
    return new FormGroup({
      code: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
    });
  }
}

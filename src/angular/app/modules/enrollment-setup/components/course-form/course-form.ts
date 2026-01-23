import { Component, output, OutputEmitterRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Course } from '@core/models/course';

@Component({
  selector: 'course-form',
  imports: [ReactiveFormsModule],
  templateUrl: './course-form.html',
  styleUrl: './course-form.scss',
})
export class CourseForm {
  public eventAddCourse: OutputEmitterRef<Course> = output();
  public eventCancel: OutputEmitterRef<void> = output();

  protected form: FormGroup;

  constructor() {
    this.form = this.#buildForm();
  }

  public handleAddCourse(): void {
    if (this.form.invalid) return;
    this.eventAddCourse.emit(this.form.value);
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

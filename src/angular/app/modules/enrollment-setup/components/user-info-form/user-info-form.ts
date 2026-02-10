import {
  Component,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Student } from '@core/models/student';

@Component({
  selector: 'user-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.scss',
})
export class UserInfoForm implements OnInit {
  student: InputSignal<Student | undefined> = input();
  form: ModelSignal<FormGroup> = model.required();

  ngOnInit(): void {
    this.#initialize();
  }

  #initialize(): void {
    const student: Student | undefined = this.student();
    if (student) {
      this.form().setValue({
        sis: student.sis,
        password: student.password,
        birthdate: student.birthday,
      });
    }
  }
}

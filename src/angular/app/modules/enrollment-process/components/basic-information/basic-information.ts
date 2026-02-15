import { Component, input, InputSignal } from '@angular/core';

import { Student } from '@core/models/student';

@Component({
  selector: 'basic-information',
  imports: [],
  templateUrl: './basic-information.html',
  styleUrl: './basic-information.scss',
})
export class BasicInformation {
  student: InputSignal<Student> = input.required();
  codes: InputSignal<string[]> = input.required();
}

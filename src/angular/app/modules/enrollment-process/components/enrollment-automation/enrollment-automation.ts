import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

import { Course } from '@core/models/course';

import { Courses } from '../../components/courses/courses';

@Component({
  selector: 'enrollment-automation',
  imports: [Courses],
  templateUrl: './enrollment-automation.html',
  styleUrl: './enrollment-automation.scss',
})
export class EnrollmentAutomation {
  courses: InputSignal<Course[]> = input.required();

  saveAndFinish: OutputEmitterRef<void> = output();

  onSaveAndFinish(): void {
    this.saveAndFinish.emit();
  }
}

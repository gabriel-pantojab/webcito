import { Component, input, InputSignal } from '@angular/core';

import { Course } from '@core/models/course';

import { Courses } from '../courses/courses';

@Component({
  selector: 'courses-details',
  imports: [Courses],
  templateUrl: './courses-details.html',
  styleUrl: './courses-details.scss',
})
export class CoursesDetails {
  processedCourses: InputSignal<Course[]> = input.required();
  unprocessedCourses: InputSignal<Course[]> = input.required();
}

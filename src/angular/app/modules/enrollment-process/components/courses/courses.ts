import { Component, input, InputSignal } from '@angular/core';

import { Course } from '@core/models/course';

import { CourseCard } from '../course-card/course-card';

@Component({
  selector: 'courses',
  templateUrl: './courses.html',
  styleUrl: './courses.scss',
  imports: [CourseCard],
})
export class Courses {
  processedCourses: InputSignal<Course[]> = input.required();
  unprocessedCourses: InputSignal<Course[]> = input.required();
}

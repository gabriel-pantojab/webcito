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
  courses: InputSignal<Course[]> = input.required();
}

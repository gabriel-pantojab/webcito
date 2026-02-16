import { Component, input, InputSignal } from '@angular/core';

import { Course } from '@core/models/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.html',
  styleUrl: './course-card.scss',
})
export class CourseCard {
  course: InputSignal<Course> = input.required();
}

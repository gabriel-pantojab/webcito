import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';

import { CourseStatus } from '@core/enums/course-status';
import { Course } from '@core/models/course';

import { EnrollmentProcessFacade } from '../../facades/enrollment-process.facade';

import { Courses } from '../../components/courses/courses';

@Component({
  selector: 'courses-container',
  imports: [Courses],
  templateUrl: './courses-container.html',
  styleUrl: './courses-container.scss',
})
export class CoursesContainer implements OnInit {
  #enrollmentProcessFacade: EnrollmentProcessFacade = inject(
    EnrollmentProcessFacade,
  );

  protected processedCourses: Signal<Course[]> = signal([]);
  protected unprocessedCourses: Signal<Course[]> = signal([]);

  ngOnInit(): void {
    this.#initialize();
  }

  #initialize(): void {
    this.processedCourses = computed(() =>
      this.#enrollmentProcessFacade
        .getCourses()()
        .filter((course) => course.status === CourseStatus.FINISHED),
    );

    this.unprocessedCourses = computed(() =>
      this.#enrollmentProcessFacade
        .getCourses()()
        .filter((course) => course.status === CourseStatus.PENDING),
    );
  }
}

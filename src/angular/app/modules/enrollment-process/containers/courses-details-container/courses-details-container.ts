import { Component, inject, OnInit, signal, Signal } from '@angular/core';

import { Course } from '@core/models/course';

import { EnrollmentProcessFacade } from '../../facades/enrollment-process.facade';

import { CoursesDetails } from '../../components/courses-details/courses-details';

@Component({
  selector: 'courses-details-container',
  imports: [CoursesDetails],
  templateUrl: './courses-details-container.html',
})
export class CoursesDetailsContainer implements OnInit {
  #enrollmentProcessFacade: EnrollmentProcessFacade = inject(
    EnrollmentProcessFacade,
  );

  protected processedCourses: Signal<Course[]> = signal([]);
  protected unprocessedCourses: Signal<Course[]> = signal([]);

  ngOnInit(): void {
    this.#initialize();
  }

  #initialize(): void {
    this.processedCourses = this.#enrollmentProcessFacade.getProcessedCourses();
    this.unprocessedCourses =
      this.#enrollmentProcessFacade.getUnprocessedCourses();
  }
}

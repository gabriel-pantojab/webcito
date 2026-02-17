import { computed, inject, Injectable, Signal } from '@angular/core';

import { CourseStatus } from '@core/enums/course-status';
import { Course } from '@core/models/course';
import { EnrollmentState } from '@core/state-management/enrollment-state';

@Injectable()
export class EnrollmentAutomationFacade {
  #store: EnrollmentState = inject(EnrollmentState);

  getCoursesForAutomation(): Signal<Course[]> {
    return computed(() =>
      (this.#store.selectCourses()() ?? []).filter(
        (course) => course.status === CourseStatus.PENDING,
      ),
    );
  }
}

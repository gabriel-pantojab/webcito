import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '@core/models/course';

import { EnrollmentAutomationFacade } from '../../facades/enrollment-automation.facade';

import { EnrollmentAutomation } from '../../components/enrollment-automation/enrollment-automation';

@Component({
  selector: 'enrollment-automation-container',
  templateUrl: './enrollment-automation-container.html',
  providers: [EnrollmentAutomationFacade],
  imports: [EnrollmentAutomation],
})
export class EnrollmentAutomationContainer implements OnInit {
  protected courses: Signal<Course[]> = signal([]);

  readonly #ENROLLMENT_INFO_URL: string = '/enrollment-process/information';

  #router: Router = inject(Router);
  #enrollmentAutomationFacade: EnrollmentAutomationFacade = inject(
    EnrollmentAutomationFacade,
  );

  ngOnInit(): void {
    this.#initialize();
  }

  protected async handleSaveAndFinish(): Promise<void> {
    await this.#router.navigate([this.#ENROLLMENT_INFO_URL]);
  }

  #initialize(): void {
    this.courses = this.#enrollmentAutomationFacade.getCoursesForAutomation();
  }
}

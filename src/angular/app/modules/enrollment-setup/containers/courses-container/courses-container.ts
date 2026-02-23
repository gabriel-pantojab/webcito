import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Course } from '@core/models/course';

import { CoursesFormBuilder } from '../../use-cases/courses-form-builder';

import { CoursesStep } from '../../types/enrollment-step';

import { EnrollmentSetupFacade } from '../../facades/enrollment-setup.facade';

import { CoursesForm } from '../../components/courses-form/courses-form';

@Component({
  selector: 'courses-container',
  imports: [CoursesForm],
  providers: [CoursesFormBuilder],
  templateUrl: './courses-container.html',
})
export class CoursesContainer implements OnInit {
  protected courses: Signal<Course[]> = signal([]);
  protected form: Signal<FormGroup> = signal({} as FormGroup);

  #enrollmentSetupFacade: EnrollmentSetupFacade = inject(EnrollmentSetupFacade);
  #coursesFormBuilder: CoursesFormBuilder = inject(CoursesFormBuilder);
  #router: Router = inject(Router);

  ngOnInit(): void {
    this.#initialize();
  }

  protected async handleSubmitStepData(data: CoursesStep): Promise<void> {
    this.#enrollmentSetupFacade.saveStepInformation(data);

    await this.#router.navigate(['enrollment-process', 'information']);
  }

  protected async goBack(): Promise<void> {
    await this.#router.navigate(['enrollment-setup', 'basic-info']);
  }

  #initialize(): void {
    this.courses = this.#enrollmentSetupFacade.getCourses();
    this.form = signal(this.#coursesFormBuilder.invoke());
  }
}

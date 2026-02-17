import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { Enrollment } from '@core/models/enrollment';

import { StepSubmitEvent } from '../../types/step-submit-event';

import { EnrollmentSetupFacade } from '../../facades/enrollment-setup.facade';

import { Wizard } from '../../components/wizard/wizard';

@Component({
  selector: 'enrollment-setup-container',
  imports: [Wizard],
  templateUrl: './enrollment-setup-container.html',
  styleUrl: './enrollment-setup-container.scss',
})
export class EnrollmentSetupContainer implements OnInit {
  protected enrollment: Signal<Enrollment> = signal({} as Enrollment);

  readonly #enrollmentSetupFacade: EnrollmentSetupFacade = inject(
    EnrollmentSetupFacade,
  );
  readonly #router: Router = inject(Router);

  readonly #ENROLLMENT_PROCESS_URL: string = '/enrollment-process';

  ngOnInit(): void {
    this.#initialize();
  }

  protected async handleSubmitStepData(
    stepEvent: StepSubmitEvent,
  ): Promise<void> {
    this.#enrollmentSetupFacade.saveStepInformation(stepEvent.data);

    if (stepEvent.shouldFinish) {
      await this.#router.navigate([this.#ENROLLMENT_PROCESS_URL]);
    }
  }

  #initialize(): void {
    this.enrollment = this.#enrollmentSetupFacade.getEnrollment();
  }
}

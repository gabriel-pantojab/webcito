import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { EnrollmentStep } from '../../types/enrollment-step';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';

import { EnrollmentSetupFacade } from '../../facades/enrollment-setup.facade';

import { Wizard } from '../../components/wizard/wizard';

@Component({
  selector: 'enrollment-setup-container',
  imports: [Wizard],
  templateUrl: './enrollment-setup-container.html',
  styleUrl: './enrollment-setup-container.scss',
})
export class EnrollmentSetupContainer {
  readonly #enrollmentSetupFacade: EnrollmentSetupFacade = inject(
    EnrollmentSetupFacade,
  );
  readonly #router: Router = inject(Router);

  // todo: rename after defining the next page name
  readonly #URL: string = '';

  protected async handleSubmitStepData(data: EnrollmentStep): Promise<void> {
    this.#enrollmentSetupFacade.saveStepInformation(data);

    if (data.type === EnrollmentStepType.COURSES) {
      await this.#router.navigate([this.#URL]);
    }
  }
}

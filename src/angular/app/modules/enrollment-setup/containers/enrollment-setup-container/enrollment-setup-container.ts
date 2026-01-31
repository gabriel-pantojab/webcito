import { Component } from '@angular/core';

import { EnrollmentStep } from '../../types/enrollment-step';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';

import { Wizard } from '../../components/wizard/wizard';

@Component({
  selector: 'enrollment-setup-container',
  imports: [Wizard],
  templateUrl: './enrollment-setup-container.html',
  styleUrl: './enrollment-setup-container.scss',
})
export class EnrollmentSetupContainer {
  public handleSubmitStepData(data: EnrollmentStep): void {
    if (data.type !== EnrollmentStepType.COURSES) {
      //  save to state
      return;
    }

    // navigate to +++
  }
}

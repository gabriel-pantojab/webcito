import { Component } from '@angular/core';

import { EnrollmentSetup } from '../../types/enrollment-setup';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';

import { Wizard } from '../../components/wizard/wizard';

@Component({
  selector: 'enrollment-setup-container',
  imports: [Wizard],
  templateUrl: './enrollment-setup-container.html',
  styleUrl: './enrollment-setup-container.scss',
})
export class EnrollmentSetupContainer {
  public handleSubmitStepData(data: EnrollmentSetup): void {
    if (data.type !== EnrollmentStepType.SUBJECTS) {
      //  save to state
      return;
    }

    // navigate to +++
  }
}

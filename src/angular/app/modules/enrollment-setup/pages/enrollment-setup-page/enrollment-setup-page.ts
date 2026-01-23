import { Component } from '@angular/core';

import { EnrollmentSetupContainer } from '../../containers/enrollment-setup-container/enrollment-setup-container';

@Component({
  selector: 'enrollment-setup-page',
  imports: [EnrollmentSetupContainer],
  templateUrl: './enrollment-setup-page.html',
  styleUrl: './enrollment-setup-page.scss',
})
export class EnrollmentSetupPage {}

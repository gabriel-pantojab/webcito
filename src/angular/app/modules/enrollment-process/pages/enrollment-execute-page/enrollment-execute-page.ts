import { Component } from '@angular/core';

import { EnrollmentAutomationContainer } from '../../containers/enrollment-automation-container/enrollment-automation-container';

@Component({
  selector: 'enrollment-execute-page',
  imports: [EnrollmentAutomationContainer],
  templateUrl: './enrollment-execute-page.html',
  styleUrl: './enrollment-execute-page.scss',
})
export class EnrollmentExecutePage {}

import { Component } from '@angular/core';

import { BasicInformationContainer } from '../../containers/basic-information-container/basic-information-container';

@Component({
  selector: 'enrollment-info-page',
  imports: [BasicInformationContainer],
  templateUrl: './enrollment-info-page.html',
  styleUrl: './enrollment-info-page.scss',
})
export class EnrollmentInfoPage {}

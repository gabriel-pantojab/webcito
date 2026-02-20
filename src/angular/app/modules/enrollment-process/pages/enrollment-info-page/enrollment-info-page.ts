import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BasicInformationContainer } from '../../containers/basic-information-container/basic-information-container';
import { CoursesDetailsContainer } from '../../containers/courses-details-container/courses-details-container';

@Component({
  selector: 'enrollment-info-page',
  imports: [BasicInformationContainer, CoursesDetailsContainer, RouterLink],
  templateUrl: './enrollment-info-page.html',
  styleUrl: './enrollment-info-page.scss',
})
export class EnrollmentInfoPage {
  protected readonly ENROLLMENT_SETUP_URL: string = '/enrollment-setup/courses';
  protected readonly ENROLLMENT_EXECUTE_URL: string =
    '/enrollment-process/execute';
}

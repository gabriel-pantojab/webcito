import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CoursesContainer } from '../..//containers/courses-container/courses-container';
import { BasicInformationContainer } from '../../containers/basic-information-container/basic-information-container';

@Component({
  selector: 'enrollment-info-page',
  imports: [BasicInformationContainer, CoursesContainer, RouterLink],
  templateUrl: './enrollment-info-page.html',
  styleUrl: './enrollment-info-page.scss',
})
export class EnrollmentInfoPage {
  protected readonly ENROLLMENT_SETUP_URL: string = '/enrollment-setup';
  // todo: replace url
  protected readonly ENROLLMENT_EXECUTE_URL: string = '/enrollment-setup';
}

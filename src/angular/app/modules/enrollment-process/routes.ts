import { Routes } from '@angular/router';

import { EnrollmentInfoPage } from './pages/enrollment-info-page/enrollment-info-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'information',
  },
  {
    path: 'information',
    component: EnrollmentInfoPage,
  },
];

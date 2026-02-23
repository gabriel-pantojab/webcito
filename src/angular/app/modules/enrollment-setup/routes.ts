import { Routes } from '@angular/router';

import { BasicInfoStepPage } from './pages/basic-info-step-page/basic-info-step-page';
import { CoursesStepPage } from './pages/courses-step-page/courses-step-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'basic-info',
  },
  {
    path: 'basic-info',
    component: BasicInfoStepPage,
  },
  {
    path: 'courses',
    component: CoursesStepPage,
  },
];

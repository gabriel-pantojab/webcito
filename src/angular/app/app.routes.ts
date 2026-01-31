import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/home/home-module').then((m) => m.HomeModule),
  },
  {
    path: 'enrollment-setup',
    loadChildren: () =>
      import('./modules/enrollment-setup/enrollment-setup-module').then(
        (m) => m.EnrollmentSetupModule,
      ),
  },
];

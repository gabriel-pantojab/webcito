import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnrollmentSetupFacade } from './facades/enrollment-setup.facade';
import { routes } from './routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [EnrollmentSetupFacade],
})
export class EnrollmentSetupModule {}

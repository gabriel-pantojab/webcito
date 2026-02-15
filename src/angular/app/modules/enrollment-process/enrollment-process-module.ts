import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnrollmentProcessFacade } from './facades/enrollment-process.facade';
import { routes } from './routes';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [EnrollmentProcessFacade],
})
export class EnrollmentProcessModule {}

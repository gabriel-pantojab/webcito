import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Student } from '@core/models/student';

import { UserInfoFormBuilder } from '../../use-cases/user-info-form-builder';

import { BasicInfoStep } from '../../types/enrollment-step';

import { EnrollmentSetupFacade } from '../../facades/enrollment-setup.facade';

import { UserInfoForm } from '../../components/user-info-form/user-info-form';

@Component({
  selector: 'basic-info-container',
  imports: [UserInfoForm],
  providers: [UserInfoFormBuilder],
  templateUrl: './basic-info-container.html',
})
export class BasicInfoContainer implements OnInit {
  protected student: Signal<Student> = signal({} as Student);
  protected codes: Signal<string[]> = signal([]);
  protected form: Signal<FormGroup> = signal({} as FormGroup);

  #enrollmentSetupFacade: EnrollmentSetupFacade = inject(EnrollmentSetupFacade);
  #userInfoFormBuilder: UserInfoFormBuilder = inject(UserInfoFormBuilder);
  #router: Router = inject(Router);

  ngOnInit(): void {
    this.#initialize();
  }

  #initialize(): void {
    this.student = this.#enrollmentSetupFacade.getStudent();
    this.codes = this.#enrollmentSetupFacade.getCodes();
    this.form = signal(this.#userInfoFormBuilder.invoke());
  }

  protected async handleSubmitStepData(data: BasicInfoStep): Promise<void> {
    this.#enrollmentSetupFacade.saveStepInformation(data);

    await this.#router.navigate(['enrollment-setup', 'courses']);
  }

  protected async goBack(): Promise<void> {
    await this.#router.navigate(['']);
  }
}

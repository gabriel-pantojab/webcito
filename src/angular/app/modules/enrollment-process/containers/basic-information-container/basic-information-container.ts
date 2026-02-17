import { Component, inject, OnInit, signal, Signal } from '@angular/core';

import { BasicInformationType } from '../../types/basic-information-type';

import { EnrollmentProcessFacade } from '../../facades/enrollment-process.facade';

import { BasicInformation } from '../../components/basic-information/basic-information';

@Component({
  selector: 'basic-information-container',
  imports: [BasicInformation],
  templateUrl: './basic-information-container.html',
})
export class BasicInformationContainer implements OnInit {
  #enrollmentProcessFacade: EnrollmentProcessFacade = inject(
    EnrollmentProcessFacade,
  );

  protected basicInformation: Signal<BasicInformationType> = signal(
    {} as BasicInformationType,
  );

  ngOnInit(): void {
    this.#initialize();
  }

  #initialize(): void {
    this.basicInformation = this.#enrollmentProcessFacade.getStudentAndCodes();
  }
}

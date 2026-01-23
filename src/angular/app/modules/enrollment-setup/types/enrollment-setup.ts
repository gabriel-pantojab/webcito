import { Subject } from '@core/types/domain/subject';

import { EnrollmentStepType } from './enums/enrollment-step-type';

interface BaseEnrollmentSetup {
  type: EnrollmentStepType;
}

export interface UserInfoStep extends BaseEnrollmentSetup {
  type: EnrollmentStepType.USER_INFO;
  sis: string;
  password: string;
  birthdate: string;
}

export interface CodesStep extends BaseEnrollmentSetup {
  type: EnrollmentStepType.CODES;
  codes: string[];
}

export interface SubjectsStep extends BaseEnrollmentSetup {
  type: EnrollmentStepType.SUBJECTS;
  subjects: Subject[];
}

export type EnrollmentSetup = UserInfoStep | CodesStep | SubjectsStep;

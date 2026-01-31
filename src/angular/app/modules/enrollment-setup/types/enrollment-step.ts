import { Course } from '@core/models/course';

import { EnrollmentStepType } from './enums/enrollment-step-type';

interface BaseEnrollmentStep {
  type: EnrollmentStepType;
}

export interface UserInfoStep extends BaseEnrollmentStep {
  type: EnrollmentStepType.USER_INFO;
  sis: string;
  password: string;
  birthdate: string;
}

export interface CodesStep extends BaseEnrollmentStep {
  type: EnrollmentStepType.CODES;
  codes: string[];
}

export interface CoursesStep extends BaseEnrollmentStep {
  type: EnrollmentStepType.COURSES;
  courses: Course[];
}

export type EnrollmentStep = UserInfoStep | CodesStep | CoursesStep;

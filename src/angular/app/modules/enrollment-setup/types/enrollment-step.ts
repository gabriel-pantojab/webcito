import { Course } from '@core/models/course';
import { Birthday } from '@core/models/student';

import { EnrollmentStepType } from './enums/enrollment-step-type';

interface BaseEnrollmentStep {
  type: EnrollmentStepType;
}

export interface BasicInfoStep extends BaseEnrollmentStep {
  type: EnrollmentStepType.BASIC_INFO;
  sis: string;
  password: string;
  birthdate: Birthday;
  codes: string[];
}

export interface CoursesStep extends BaseEnrollmentStep {
  type: EnrollmentStepType.COURSES;
  courses: Course[];
}

export type EnrollmentStep = BasicInfoStep | CoursesStep;

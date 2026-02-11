import { EnrollmentStep } from './enrollment-step';

export interface StepSubmitEvent {
  data: EnrollmentStep;
  shouldFinish: boolean;
}

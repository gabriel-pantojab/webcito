import { IWizardStep } from '../interfaces/wizard-step';

export const ENROLLMENT_WIZARD_STEPS: IWizardStep[] = [
  {
    step: 1,
    path: '/enrollment-setup/basic-info',
  },
  {
    step: 2,
    path: '/enrollment-setup/courses',
  },
  {
    step: 3,
    path: '/enrollment-process/information',
  },
];

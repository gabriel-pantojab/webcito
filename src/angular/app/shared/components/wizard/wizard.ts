import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { IWizardStep } from '../../interfaces/wizard-step';

@Component({
  selector: 'wizard',
  imports: [RouterLink],
  templateUrl: './wizard.html',
  styleUrl: './wizard.scss',
})
export class Wizard {
  currentStep: InputSignal<number> = input(1);
  steps: InputSignal<IWizardStep[]> = input([] as IWizardStep[]);
  disabledNext: InputSignal<boolean> = input(false);

  next: OutputEmitterRef<void> = output();
  previous: OutputEmitterRef<void> = output();
}

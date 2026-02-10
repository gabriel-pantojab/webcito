import {
  Component,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'codes-form',
  imports: [ReactiveFormsModule],
  templateUrl: './codes-form.html',
  styleUrl: './codes-form.scss',
})
export class CodesForm implements OnInit {
  codes: InputSignal<string[] | undefined> = input();
  form: ModelSignal<FormGroup> = model.required();

  ngOnInit(): void {
    this.#initialize();
  }

  #initialize(): void {
    const codes: string[] | undefined = this.codes();
    if (codes?.length) {
      this.form().setValue({
        codeOne: codes[0],
        codeTwo: codes[1],
        codeThree: codes[2],
        codeFour: codes[3],
        codeFive: codes[4],
      });
    }
  }
}

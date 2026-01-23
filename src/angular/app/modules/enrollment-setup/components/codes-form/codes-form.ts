import {Component, model, ModelSignal} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'codes-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './codes-form.html',
  styleUrl: './codes-form.scss'
})
export class CodesForm {
  public form: ModelSignal<FormGroup> = model.required();
}

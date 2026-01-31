import { Component, model, ModelSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'user-info-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-info-form.html',
  styleUrl: './user-info-form.scss',
})
export class UserInfoForm {
  public form: ModelSignal<FormGroup> = model.required();
}

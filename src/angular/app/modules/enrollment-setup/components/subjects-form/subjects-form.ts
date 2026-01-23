import {
  Component,
  inject,
  model,
  ModelSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { Subject } from '@core/types/domain/subject';

import { SubjectForm } from '../subject-form/subject-form';

@Component({
  selector: 'subjects-form',
  imports: [ReactiveFormsModule, SubjectForm],
  templateUrl: './subjects-form.html',
  styleUrl: './subjects-form.scss',
})
export class SubjectsForm {
  public form: ModelSignal<FormGroup> = model.required();

  protected subjects: WritableSignal<Subject[]> = signal([]);

  #formBuilder: FormBuilder = inject(FormBuilder);

  public addSubject(subject: Subject): void {
    if (this.#alreadySubjectExist(subject.code)) return;
    this.subjects.update((prev) => {
      const subjects: Subject[] = [...prev, subject];
      const subjectsForm: FormArray = this.form().get('subjects') as FormArray;
      subjectsForm.clear();
      subjects.forEach((subject: Subject) => {
        subjectsForm.push(this.#formBuilder.control(subject));
      });
      return subjects;
    });
  }

  public removeSubject(code: string): void {
    this.subjects.update((prev) =>
      prev.filter((subject) => subject.code !== code),
    );
  }

  #alreadySubjectExist(code: string): boolean {
    return !!this.subjects().find((subject) => subject.code === code);
  }
}

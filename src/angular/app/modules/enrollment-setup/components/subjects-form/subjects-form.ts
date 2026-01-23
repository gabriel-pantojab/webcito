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
      this.#updateForm(subjects);
      return subjects;
    });
  }

  public removeSubject(code: string): void {
    this.subjects.update((prev) => {
      const subjects: Subject[] = prev.filter(
        (subject) => subject.code !== code,
      );
      this.#updateForm(subjects);
      return subjects;
    });
  }

  #alreadySubjectExist(code: string): boolean {
    return this.subjects().some((subject) => subject.code === code);
  }

  #updateForm(subjects: Subject[]): void {
    const subjectsForm: FormArray = this.form().get('subjects') as FormArray;
    subjectsForm.clear();
    subjects.forEach((subject: Subject) => {
      subjectsForm.push(this.#formBuilder.control(subject));
    });
  }
}

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

import { Course } from '@core/models/course';

import { CourseForm } from '@modules/enrollment-setup/components/course-form/course-form';

@Component({
  selector: 'courses-form',
  imports: [ReactiveFormsModule, CourseForm],
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.scss',
})
export class CoursesForm {
  public form: ModelSignal<FormGroup> = model.required();

  protected courses: WritableSignal<Course[]> = signal([]);

  #formBuilder: FormBuilder = inject(FormBuilder);

  public addCourse(course: Course): void {
    if (this.#alreadyCourseExist(course.code)) return;
    this.courses.update((prev) => {
      const courses: Course[] = [...prev, course];
      this.#updateForm(courses);
      return courses;
    });
  }

  public removeCourse(code: string): void {
    this.courses.update((prev) => {
      const courses: Course[] = prev.filter((course) => course.code !== code);
      this.#updateForm(courses);
      return courses;
    });
  }

  #alreadyCourseExist(code: string): boolean {
    return this.courses().some((course) => course.code === code);
  }

  #updateForm(courses: Course[]): void {
    const coursesForm: FormArray = this.form().get('courses') as FormArray;
    coursesForm.clear();
    courses.forEach((course: Course) => {
      coursesForm.push(this.#formBuilder.control(course));
    });
  }
}

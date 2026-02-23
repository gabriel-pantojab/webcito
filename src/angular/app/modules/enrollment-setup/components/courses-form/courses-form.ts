import {
  Component,
  inject,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnInit,
  output,
  OutputEmitterRef,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { CourseStatus } from '@core/enums/course-status';
import { Course } from '@core/models/course';

import { Wizard } from '@/shared/components/wizard/wizard';
import { ENROLLMENT_WIZARD_STEPS } from '@/shared/constants/enrollment-setup-steps';
import { IWizardStep } from '@/shared/interfaces/wizard-step';

import { CoursesStep } from '../../types/enrollment-step';
import { EnrollmentStepType } from '../../types/enums/enrollment-step-type';

import { CourseForm } from '../../components/course-form/course-form';

@Component({
  selector: 'courses-form',
  imports: [ReactiveFormsModule, CourseForm, Wizard],
  templateUrl: './courses-form.html',
  styleUrl: './courses-form.scss',
})
export class CoursesForm implements OnInit {
  initialCourses: InputSignal<Course[] | undefined> = input();
  form: ModelSignal<FormGroup> = model.required();

  submitData: OutputEmitterRef<CoursesStep> = output();
  goBack: OutputEmitterRef<void> = output();

  protected courses: WritableSignal<Course[]> = signal([]);

  readonly STEPS: IWizardStep[] = ENROLLMENT_WIZARD_STEPS;
  readonly CURRENT_STEP: number = 2;

  #formBuilder: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.#initialize();
  }

  protected handleSubmitData(): void {
    this.submitData.emit({
      ...(this.form().value as CoursesStep),
      type: EnrollmentStepType.COURSES,
    });
  }

  protected addCourse(course: Course): void {
    if (this.#alreadyCourseExist(course.code)) return;
    const courses: Course[] = [
      ...this.courses(),
      { ...course, status: CourseStatus.PENDING },
    ];
    this.#updateCourses(courses);
  }

  protected removeCourse(code: string): void {
    const courses: Course[] = this.courses().filter(
      (course) => course.code !== code,
    );
    this.#updateCourses(courses);
  }

  #initialize(): void {
    const courses: Course[] = [...(this.initialCourses() ?? [])];
    this.courses.set(courses);
    this.#updateForm(courses);
  }

  #updateCourses(courses: Course[]): void {
    this.#updateForm(courses);
    this.courses.set(courses);
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

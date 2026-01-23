import { Injectable, Signal } from '@angular/core';

import { State } from '../services/state';

import { Course } from '../models/course';
import { Enrollment } from '../models/enrollment';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentState extends State<Enrollment> {
  readonly #STUDENT_KEY_NAME: Extract<keyof Enrollment, 'student'> = 'student';
  readonly #CODES_KEY_NAME: Extract<keyof Enrollment, 'codes'> = 'codes';
  readonly #COURSES_KEY_NAME: Extract<keyof Enrollment, 'courses'> = 'courses';

  constructor() {
    super({
      student: {
        sis: '',
        password: '',
        birthday: '',
      },
      courses: [],
      codes: [],
    });
  }

  public setStudent(student: Student): void {
    this.set(this.#STUDENT_KEY_NAME, student);
  }

  public setCodes(codes: string[]): void {
    this.set(this.#CODES_KEY_NAME, codes);
  }

  public setCourses(courses: Course[]): void {
    this.set(this.#COURSES_KEY_NAME, courses);
  }

  public addCourse(course: Course): void {
    const courses: Course[] = [...this.state().courses, course];
    this.set(this.#COURSES_KEY_NAME, courses);
  }

  public selectStudent(): Signal<Student> {
    return this.select(this.#STUDENT_KEY_NAME);
  }

  public selectCodes(): Signal<string[]> {
    return this.select(this.#CODES_KEY_NAME);
  }

  public selectCourses(): Signal<Course[]> {
    return this.select(this.#COURSES_KEY_NAME);
  }

  public deleteCourse(code: string): void {
    const courses: Course[] = this.state().courses.filter(
      (course: Course) => course.code !== code,
    );
    this.set(this.#COURSES_KEY_NAME, courses);
  }
}

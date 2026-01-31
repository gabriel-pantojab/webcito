import { Course } from './course';
import { Student } from './student';

export interface Enrollment {
  student: Student;
  codes: string[];
  courses: Course[];
}

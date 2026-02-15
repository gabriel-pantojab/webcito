import { CourseStatus } from '../enums/course-status';

export interface Course {
  code: string;
  type: string;
  group: string;
  status: CourseStatus;
}

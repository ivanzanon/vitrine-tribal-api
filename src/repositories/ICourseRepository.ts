import { Course } from '../entities/Course';

export interface ICourseRepository {
    getCourse(): Promise<Course[]>;
    store(course: Course): Promise<void>;
}

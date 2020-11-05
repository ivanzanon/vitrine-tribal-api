import { Course } from '../entities/Course';

export interface ICourseRepository {
    getCourse(id: number): Promise<Course>;
    store(course: Course): Promise<void>;
}

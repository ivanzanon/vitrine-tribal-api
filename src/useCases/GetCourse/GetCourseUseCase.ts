import { Course } from '../../entities/Course';
import { ICourseRepository } from '../../repositories/ICourseRepository';

export class GetCourseUseCase {
    private courseRepository: ICourseRepository;

    constructor(courseRepository: ICourseRepository) {
      this.courseRepository = courseRepository;
    }

    execute(): Promise<Course[]> {
      const courses = this.courseRepository.getCourse();

      return courses;
    }
}

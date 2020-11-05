import { Courses } from '../../../database/models/Courses';
import { Course } from '../../../entities/Course';
import { ICourseRepository } from '../../ICourseRepository';

export class PostgresCourseRepository implements ICourseRepository {
  getCourse(id: number): Promise<Course> {
    throw new Error('Method not implemented.');
  }

  async store(course: Course): Promise<void> {
    try {
      console.log('gravando course');
      console.log(course);
      Courses.create(
        {
          title: course.title,
          teacher: course.Teacher.id,
          price: course.price,
          location: course.location,
          dateStart: course.dateStart,
          dateEnd: course.dateEnd,
          hourStart: course.hourStart,
          hourEnd: course.hourEnd,
          interval: course.interval,
          description: course.description,
          inscriptionUrl: course.inscriptionUrl,
          classUrl: course.inscriptionUrl,
        },
      );
    } catch (error) {
      throw new Error(error.message || 'Deu ruim');
    }
  }
}

import { Courses } from '../../../database/models/Courses';
import { Teachers } from '../../../database/models/Teachers';
import { Users } from '../../../database/models/Users';
import { Course } from '../../../entities/Course';
import { ICourseRepository } from '../../ICourseRepository';

export class PostgresCourseRepository implements ICourseRepository {
  async getCourse(): Promise<Course[]> {
    try {
      const data = await Courses.findAll({
        include: {
          model: Teachers,
          as: 'Teacher',
          attributes: ['id'],

          include: [{
            model: Users,
            as: 'User',
            attributes: ['fullname'],
          }],
        },
      });

      const courses = data.map((course) => new Course(
        {
          id: course.id,
          title: course.title,
          teacher: course.Teacher.User.fullname,
          description: course.description,
          location: course.location,
          price: course.price,
          dateStart: course.dateStart,
          dateEnd: course.dateEnd,
          hourStart: course.hourStart,
          hourEnd: course.hourEnd,
          interval: course.interval,
          inscriptionUrl: course.inscriptionUrl,
        },
      ));

      return courses;
    } catch (error) {
      throw new Error(error.message || 'Unexpected error');
    }
  }

  async store(course: Course): Promise<void> {
    try {
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

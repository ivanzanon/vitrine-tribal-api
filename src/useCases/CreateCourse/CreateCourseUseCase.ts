import { Course } from '../../entities/Course';
import { ICourseRepository } from '../../repositories/ICourseRepository';
import { ICreateCourseRequestDTO } from './CreateCourseDTO';

export class CreateCourseUseCase {
    private courseRepository: ICourseRepository

    constructor(courseRepository: ICourseRepository) {
      this.courseRepository = courseRepository;
    }

    async execute(data: ICreateCourseRequestDTO) {
      this.validate(data);

      const course = new Course({
        id: '',
        title: data.title,
        Teacher: { id: data.teacher.id, name: '' },
        dateEnd: data.dateEnd,
        dateStart: data.dateStart,
        description: data.description,
        location: data.location,
        hourEnd: data.hourEnd,
        hourStart: data.hourStart,
        inscriptionUrl: data.inscriptionUrl,
        interval: data.interval,
        price: data.price,
      });

      this.courseRepository.store(course);
    }

    private validate({ dateStart, dateEnd }:ICreateCourseRequestDTO) {
      this.validateInterspersedDates({ dateStart, dateEnd });
      return true;
    }

    private validateInterspersedDates({ dateStart, dateEnd }) {
      return { dateStart, dateEnd };
    }
}

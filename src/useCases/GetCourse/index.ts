import { PostgresCourseRepository } from '../../repositories/implementations/sequelize/PostgresCourseRepository';
import { GetCourseController } from './GetCourseController';
import { GetCourseUseCase } from './GetCourseUseCase';

const postgresCourseRepository = new PostgresCourseRepository();
const getCourseUseCase = new GetCourseUseCase(postgresCourseRepository);
const getCourseController = new GetCourseController(getCourseUseCase);

export { getCourseController };

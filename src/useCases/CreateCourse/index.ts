import { PostgresCourseRepository } from '../../repositories/implementations/sequelize/PostgresCourseRepository';
import { CreateCourseController } from './CreateCourseController';
import { CreateCourseUseCase } from './CreateCourseUseCase';

const postgresCourseRepository = new PostgresCourseRepository();

const createCourseUseCase = new CreateCourseUseCase(postgresCourseRepository);

const createCourseController = new CreateCourseController(createCourseUseCase);

export { createCourseController };

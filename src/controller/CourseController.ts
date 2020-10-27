import { Request, Response } from 'express';

import Course, { CourseAttributes } from '../database/models/course';
import Teacher from '../database/models/teacher';
import User from '../database/models/user';

export default class CourseController {
  async index(request:Request, response:Response) {
    try {
      const data = await Course.findAll({
        include: {
          model: Teacher,
          as: 'Teacher',
          attributes: ['id'],

          include: [{
            model: User,
            as: 'User',
            attributes: ['fullname'],
          }],
        },
      });

      const courses = data.map((course) => (
        {
          id: course.id,
          title: course.title,
          teacher: course.Teacher.User.fullname,
          description: course.description,
          price: course.price,
          dateStart: course.dateStart,
          dateEnd: course.dateEnd,
          hourStart: course.hourStart,
          hourEnd: course.hourEnd,
          interval: course.interval,
          inscriptionUrl: course.inscriptionUrl,
        }));

      return response.json(courses);
    } catch (error) {
      return response.sendStatus(500).send({ message: error.message });
    }
  }

  async store(request:Request, response:Response) {
    const data:CourseAttributes = request.body;

    try {
      const courses = await Course.create(
        {
          title: data.title,
          teacher: data.teacher,
          price: data.price,
          location: data.location,
          dateStart: data.dateStart,
          dateEnd: data.dateEnd,
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          interval: data.interval,
          description: data.description,
          inscriptionUrl: data.inscriptionUrl,
          classUrl: data.inscriptionUrl,
        },
      );

      return response.json(courses);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  async delete(request:Request, response:Response) {
    const { id } = request.params;

    try {
      const data = await Course.destroy({
        where: { id },
      });

      return response.json(data);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }
}

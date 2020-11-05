import { Request, Response } from 'express';

import { Courses, CoursesAttributes } from '../database/models/Courses';
import { Teachers } from '../database/models/Teachers';
import { Users } from '../database/models/Users';

export default class CourseController {
  async index(request:Request, response:Response) {
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
    const data:CoursesAttributes = request.body;

    try {
      const courses = await Courses.create(
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
      const data = await Courses.destroy({
        where: { id },
      });

      return response.json(data);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }
}

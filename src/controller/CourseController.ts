import { Request, Response } from 'express';

import Course, { CourseAttributes } from '../database/models/course';
import Teacher from '../database/models/teacher';
import User from '../database/models/user';

export default class CourseController {
  async index(request:Request, response:Response) {
    try {
      const courses = await Course.findAll();
      return response.json(courses);
    } catch (error) {
      return response.sendStatus(500).send({ message: error.message });
    }
  }

  async getClassesOfTeacher(request:Request, response:Response) {
    try {
      const { id } = request.params;

      const courses = await Course.findAll({

        where: { '$Teacher.User.id$': id },

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

      return response.json(courses);
    } catch (error) {
      console.log(error);
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
}
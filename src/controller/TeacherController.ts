import { Request, Response } from 'express';

import Course from '../database/models/course';
import Teacher, { TeacherAttributes } from '../database/models/teacher';
import User from '../database/models/user';

export default class TeacherController {
  sum(number1:number, number2:number) {
    return number1 + number2;
  }

  async index(request:Request, response:Response) {
    try {
      const teachers = await Teacher.findAll();
      return response.json(teachers);
    } catch (error) {
      return response.sendStatus(500).send({ message: error.message });
    }
  }

  async store(request:Request, response:Response) {
    const data:TeacherAttributes = request.body;

    try {
      const teachers = await Teacher.create(
        {
          bio: data.bio,
          user: data.user,
        },
      );

      return response.json(teachers);
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }

  async show(request:Request, response:Response) {
    try {
      const teachers = await Teacher.findAll();
      return response.json(teachers);
    } catch (error) {
      return response.sendStatus(500).send({ message: error.message });
    }
  }

  async getClassesOfTeacher(request:Request, response:Response) {
    try {
      const { id } = request.params;

      const data = await Course.findAll({

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
      console.log(error);
      return response.sendStatus(500).send({ message: error.message });
    }
  }
}

import { Request, Response } from 'express';

import { Courses } from '../database/models/Courses';
import { Teachers, TeachersAttributes } from '../database/models/Teachers';
import { Users } from '../database/models/Users';

export default class TeacherController {
  sum(number1:number, number2:number) {
    return number1 + number2;
  }

  async index(request:Request, response:Response) {
    try {
      const teachers = await Teachers.findAll();
      return response.json(teachers);
    } catch (error) {
      return response.sendStatus(500).send({ message: error.message });
    }
  }

  async store(request:Request, response:Response) {
    const data:TeachersAttributes = request.body;

    try {
      const teachers = await Teachers.create(
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
      const teachers = await Teachers.findAll();
      return response.json(teachers);
    } catch (error) {
      return response.sendStatus(500).send({ message: error.message });
    }
  }

  async getClassesOfTeacher(request:Request, response:Response) {
    try {
      const { id } = request.params;

      const data = await Courses.findAll({

        where: { '$Teacher.User.id$': id },

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
      console.log(error);
      return response.sendStatus(500).send({ message: error.message });
    }
  }
}

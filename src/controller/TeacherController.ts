import { Request, Response } from 'express';

import Teacher, { TeacherAttributes } from '../database/models/teacher';

export default class TeacherController {
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
}

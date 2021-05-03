import { Request, Response } from 'express';

import { CreateCourseUseCase } from './CreateCourseUseCase';

export class CreateCourseController {
    private createCourseUseCase: CreateCourseUseCase;

    constructor(createCourseUseCase: CreateCourseUseCase) {
      this.createCourseUseCase = createCourseUseCase;
    }

    async handle(request: Request, response: Response): Promise<Response> {
      const {
        title,
        teacher,
        description,
        location,
        price,
        dateStart,
        dateEnd,
        hourStart,
        hourEnd,
        interval,
        inscriptionUrl,
      } = request.body;

      try {
        await this.createCourseUseCase.execute({
          title,
          teacher,
          description,
          location,
          price,
          dateStart,
          dateEnd,
          hourStart,
          hourEnd,
          interval,
          inscriptionUrl,
        });

        return response.status(201).send();
      } catch (error) {
        return response.status(400).json({
          message: error.message || 'Unexpected error.',
        });
      }
    }
}

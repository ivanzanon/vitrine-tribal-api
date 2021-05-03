import { Request, Response } from 'express';

import { GetCourseUseCase } from './GetCourseUseCase';

export class GetCourseController {
    private getCourseUseCase: GetCourseUseCase;

    constructor(getCourseUseCase: GetCourseUseCase) {
      this.getCourseUseCase = getCourseUseCase;
    }

    async handle(request:Request, response:Response):Promise<Response> {
      const courses = await this.getCourseUseCase.execute();

      return response.json(courses);
    }
}

import { expect } from 'chai';

import TeacherController from '../controller/TeacherController';

describe('Testing Teacher controller', () => {
  describe('index()', () => {
    const teacherController = new TeacherController();

    const data = teacherController.sum(1, 2);

    it('shoul return a number', () => {
      expect(data).to.be.an('number');
    });

    it('shoul sum two numbers', () => {
      expect(data).to.be.equal(3);
    });
  });
});

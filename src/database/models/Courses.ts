import { Model, DataTypes } from 'sequelize';

import database from '..';

export interface CoursesAttributes {
        id: number;
        title: string;
        description: string;
        location: string;
        dateStart: number;
        dateEnd: number;
        hourStart: number;
        hourEnd: number;
        interval: string;
        price: number;
        inscriptionUrl: string;
        classUrl: string;
        teacher: number;
        Teacher: {
          User: {
              fullname: string;
          }
        }
      }

// interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}

export class Courses extends Model implements CoursesAttributes {
        Teacher: { User: { fullname: string; }; };

        id:number;

        title: string;

        description: string;

        location: string;

        dateStart: number;

        dateEnd: number;

        hourStart: number;

        hourEnd: number;

        interval: string;

        price: number;

        inscriptionUrl: string;

        classUrl: string;

        teacher: number;
}

Courses.init({
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  location: DataTypes.STRING,
  dateStart: DataTypes.INTEGER,
  dateEnd: DataTypes.INTEGER,
  hourStart: DataTypes.INTEGER,
  hourEnd: DataTypes.INTEGER,
  interval: DataTypes.STRING,
  price: DataTypes.NUMBER,
  inscriptionUrl: DataTypes.STRING,
  classUrl: DataTypes.STRING,
  teacher: DataTypes.NUMBER,
}, {
  sequelize: database.connection,
  modelName: 'Course',
});

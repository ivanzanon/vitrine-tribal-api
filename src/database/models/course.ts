import { Model, DataTypes, Optional } from 'sequelize';

import database from '..';

export interface CourseAttributes {
        id: number;
        title: string;
        description: string;
        location: string;
        dateStart: string;
        dateEnd: string;
        hourStart: string;
        hourEnd: string;
        interval: string;
        price: number;
        inscriptionUrl: string;
        classUrl: string;
        teacher: number;
      }

// interface CourseCreationAttributes extends Optional<CourseAttributes, 'id'> {}

class Course extends Model implements CourseAttributes {
        id:number;

        title: string;

        description: string;

        location: string;

        dateStart: string;

        dateEnd: string;

        hourStart: string;

        hourEnd: string;

        interval: string;

        price: number;

        inscriptionUrl: string;

        classUrl: string;

        teacher: number;
}

Course.init({
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  location: DataTypes.STRING,
  dateStart: DataTypes.STRING,
  dateEnd: DataTypes.STRING,
  hourStart: DataTypes.STRING,
  hourEnd: DataTypes.STRING,
  interval: DataTypes.STRING,
  price: DataTypes.NUMBER,
  inscriptionUrl: DataTypes.STRING,
  classUrl: DataTypes.STRING,
  teacher: DataTypes.NUMBER,
}, {
  sequelize: database.connection,
  modelName: 'Course',
});

export default Course;

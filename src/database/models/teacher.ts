import { Model, DataTypes, Optional } from 'sequelize';

import database from '..';

import Course from './course';
import User from './user';

export interface TeacherAttributes {
  id: number;
  bio: string;
  user: number;
}

// interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}

class Teacher extends Model implements TeacherAttributes {
  id: number;

  bio:string;

  user: number;
}

Teacher.init({
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  bio: DataTypes.STRING,
  user: DataTypes.NUMBER,
}, {
  sequelize: database.connection,
  modelName: 'Teacher',
});

User.hasOne(Teacher, {
  foreignKey: 'user',
});

Teacher.belongsTo(User, {
  foreignKey: 'user',
});

Teacher.hasMany(Course, {
  foreignKey: 'teacher',
  sourceKey: 'id',
});

Course.belongsTo(Teacher, {
  foreignKey: 'teacher',
  targetKey: 'id',
});

export default Teacher;

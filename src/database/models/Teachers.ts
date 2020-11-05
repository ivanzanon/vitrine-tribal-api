import { Model, DataTypes } from 'sequelize';

import database from '..';

import { Courses } from './Courses';
import { Users } from './Users';

export interface TeachersAttributes {
  id: number;
  bio: string;
  user: number;
}

// interface TeacherCreationAttributes extends Optional<TeacherAttributes, 'id'> {}

export class Teachers extends Model implements TeachersAttributes {
  id: number;

  bio:string;

  user: number;
}

Teachers.init({
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

Users.hasOne(Teachers, {
  foreignKey: 'user',
});

Teachers.belongsTo(Users, {
  foreignKey: 'user',
});

Teachers.hasMany(Courses, {
  foreignKey: 'teacher',
  sourceKey: 'id',
});

Courses.belongsTo(Teachers, {
  foreignKey: 'teacher',
  targetKey: 'id',
});

import { Model, DataTypes } from 'sequelize';

import database from '..';

export interface UsersAttributes {
  id: number;
  username: string;
  fullname: string;
  password: string;
  level: string;
}

// interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class Users extends Model implements UsersAttributes {
  id: number;

  username: string;

  fullname: string;

  password: string;

  level: string;
}

Users.init({
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  fullname: DataTypes.STRING,
  password: DataTypes.STRING,
  level: DataTypes.STRING,
}, {
  sequelize: database.connection,
  modelName: 'User',
});

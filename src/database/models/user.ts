import { Model, DataTypes, Optional } from 'sequelize';

import database from '..';

export interface UserAttributes {
  id: number;
  username: string;
  fullname: string;
  password: string;
  level: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> {
  id: number;

  username: string;

  fullname: string;

  password: string;

  level: string;
}

User.init({
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

export default User;

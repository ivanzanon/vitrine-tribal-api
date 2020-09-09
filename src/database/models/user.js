'use strict';
const {
  Model, DataTypes
} = require('Sequelize');

const sequelize = require('./index');

class User extends Model {};

User.init({
  username:DataTypes.STRING,
  fullname: DataTypes.STRING,
  password: DataTypes.STRING,
  level: DataTypes.STRING
}, {
  sequelize,
  modelName: 'User',
});

User.associate = models => {
  // define association here
}

module.exports = User;
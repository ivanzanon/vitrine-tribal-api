'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Class.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    hour_start: DataTypes.TIME,
    hour_end: DataTypes.TIME,
    price: DataTypes.FLOAT,
    inscription_url: DataTypes.STRING,
    class_url: DataTypes.STRING,
    teacher: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Class',
  });
  return Class;
};
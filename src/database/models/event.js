'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Event.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    date_start: DataTypes.DATE,
    date_end: DataTypes.DATE,
    hour_start: DataTypes.TIME,
    hour_end: DataTypes.TIME,
    price: DataTypes.FLOAT,
    inscription_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
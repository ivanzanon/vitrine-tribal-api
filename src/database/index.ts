import sequelize from 'sequelize';
import envConfigs from './config';

const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

class Database {
  public connection:sequelize.Sequelize;

  constructor() {
    console.log('Carregando configurações');
    console.log(env);
    console.log(config);
    this.connection = new sequelize.Sequelize(config);
  }
}

const database: Database = new Database();

export default database;

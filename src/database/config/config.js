const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    // url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
    host: process.env.DEV_DB_HOST ? process.env.DEV_DB_HOST : '',
    username: process.env.DEV_DB_USER ? process.env.DEV_DB_USER : '',
    password: process.env.DEV_DB_PASS ? process.env.DEV_DB_PASS : '',
    database: process.env.DEV_DB_NAME ? process.env.DEV_DB_NAME : '',
    port: process.env.DEV_DB_PORT ? process.env.DEV_DB_PORT : '',
    define: {
      timestamps: true,
    },
  },
  // development_nb: {
  //   dialect: 'postgres',
  //   host: process.env.DEV_DB_HOST,
  //   username: process.env.DEV_DB_USER,
  //   password: process.env.DEV_DB_PASS,
  //   database: process.env.DEV_DB_NAME,
  //   port: process.env.DEV_DB_PORT,
  //   define: {
  //     timestamps: true,
  //   },
  // },
  // test: {
  //   url: process.env.TEST_DATABASE_URL,
  //   dialect: 'postgres',
  // },
  // production: {
  //   url: process.env.DATABASE_URL,
  //   dialect: 'postgres',
  // },
};

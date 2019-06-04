const { Sequelize } = require('sequelize');

const db = new Sequelize({
  username: 'deploy',
  host: 'localhost',
  database: 'angular_heroes_development',
  password: 'deploy',
  port: 5432,
  dialect: 'postgres'
});
exports.db = db;
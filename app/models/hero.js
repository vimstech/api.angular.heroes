const { db } = require('./../database/postgres');
const { STRING, Model, INTEGER} = require('sequelize');
class Hero extends Model {};
Hero.init({
  name: {
    type: STRING,
    defaultValue: ''
  }
}, {
  modelName: 'hero',
  timestamps: true,
  tableName: 'heroes',
  underscored: true,
  sequelize: db,
})

Hero.sync();
module.exports.Hero = Hero;
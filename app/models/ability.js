const { db } = require('./../database/postgres');
const { STRING, Model, INTEGER } = require('sequelize');

const { Hero } = require('./hero');
class Ability extends Model {};
Ability.init({
  name: {
    type: STRING
  },
  hero_id: {
    type: INTEGER
  }
}, {
  timestamps: true,
  modelName: 'ability',
  tableName: 'abilities',
  underscored: true,
  sequelize: db
})
Ability.sync();
Ability.belongsTo(Hero);
Hero.hasMany(Ability);

module.exports.Ability = Ability;